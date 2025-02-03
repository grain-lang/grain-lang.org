import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const MAILING_LIST_FORM_NAME = "mailing-list-signup";

  if (req.method !== "POST") {
    console.log(`Encountered method ${req.method}`);
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await new Response(req.body).json();

  const siteId = process.env.SITE_ID;
  if (!siteId) {
    console.log("Site ID env variable missing");
    return new Response("Missing site ID", { status: 500 });
  }

  const apiKey = process.env.NETLIFY_API_KEY;
  if (!apiKey) {
    console.log("Netlify API key missing");
    return new Response("Missing Netlify API key", { status: 500 });
  }

  const email: string | undefined = body?.email?.trim().toUpperCase();
  if (!email) {
    console.log("Request payload missing email; full body:", body);
    return new Response("Request missing email", { status: 422 });
  }

  try {
    const allForms = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    }).then(res => res.json());

    const eligibleMailingListForms = allForms.filter((form: any) => form.name === MAILING_LIST_FORM_NAME);
    if (eligibleMailingListForms.length !== 1) {
      console.log(`Found ${eligibleMailingListForms.length} mailing list forms`);
      return new Response("Unexpectedly found multiple mailing list sign up forms", { status: 500 });
    }

    const mailingListFormId = eligibleMailingListForms[0].id;

    const mailingListSubmissions = await fetch(`https://api.netlify.com/api/v1/forms/${mailingListFormId}/submissions`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    }).then(res => res.json());

    const matchedSubmissions = mailingListSubmissions
      .filter((submission: any) => submission.data.email?.trim()?.toUpperCase() === email);

    await Promise.all(
      matchedSubmissions.map((submission: any) =>
        fetch(`https://api.netlify.com/api/v1/submissions/${submission.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${apiKey}` },
        })
      )
    );

    return new Response("Success");
  } catch (err) {
    console.log("Failed to delete submissions:", err);
    return new Response("Failed to delete submissions", { status: 500 });
  }
};
