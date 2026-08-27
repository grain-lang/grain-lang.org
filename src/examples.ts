const basicExample = `module Main

let translateCoordinates = (x, y) => {
  (x + 4, y + 4)
}

let (x, y) = translateCoordinates(1, 2)
print(x) // 5
print(y) // 6
`;

const typeInferenceExample = `module Main

let square = n => n * n

square("🌾") // Compile error: expected a Number
`;

const safeExample = `module Main

from "map" include Map

let printMovieRating = movie => {
  let catalog = Map.fromList([
    ("Godzilla", 7.5),
    ("Forrest Gump", 8.8),
    ("The Dark Knight", 9.0),
  ])

  // All cases must be handled
  match (Map.get(movie, catalog)) {
    Some(rating) => print(rating),
    None => print("Rating unavailable") // No unexpected null!
  }
}

printMovieRating("The Matrix") // Rating unavailable
`;

const practicalExample = `module Main

from "fs" include Fs
from "path" include Path
from "json" include Json
from "result" include Result

enum Error {
  ReadError(Fs.FileError),
  ParseError(Json.JsonParseError),
}

let parseFileAsJson = filePath => {
  match (Fs.Utf8.readFile(Path.fromString(filePath))) {
    Ok(data) => Result.mapErr(err => ParseError(err), Json.parse(data)),
    Err(err) => Err(ReadError(err))
  }
}
`;

const functionalExample = `module Main

let rec map = (f, list) => {
  match (list) {
    [] => [],
    [first, ...rest] => [f(first), ...map(f, rest)]
  }
}

let doubled = map(x => x * 2, [1, 2, 3])
assert doubled == [2, 4, 6]
`;

const imperativeExample = `module Main

from "array" include Array

let contains = (value, array) => {
  for (let mut i = 0; i < Array.length(array); i += 1) {
    if (array[i] == value) {
      return true
    }
  }

  return false
}

print(contains(3, [> 1, 2, 3, 4])) // true
`;

export interface CodeExample {
  name: string;
  code: string;
}

export const codeExamples: CodeExample[] = [
  {
    name: "Basic",
    code: basicExample,
  },
  {
    name: "Type Inference",
    code: typeInferenceExample,
  },
  {
    name: "Safe",
    code: safeExample,
  },
  {
    name: "Practical",
    code: practicalExample,
  },
  {
    name: "Functional",
    code: functionalExample,
  },
  {
    name: "Imperative",
    code: imperativeExample,
  },
];
