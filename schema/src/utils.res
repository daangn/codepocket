type prettierType = {parser: string}

@module("prettier")
external format: (string, prettierType) => string = "format"

@module("fs")
external readFileSync: (~path: string, @string [#utf8 | @as("ascii") #useAscii]) => string =
  "readFileSync"
@module("fs")
external readdirSync: (~path: string) => array<string> = "readdirSync"
@module("fs")
external mkdirSync: (~path: string) => unit = "mkdirSync"
@module("fs")
external rmSync: (~path: string, ~options: {"recursive": bool, "force": bool}) => unit = "rmSync"
@module("fs")
external writeFileSync: (~filename: string, ~text: string) => unit = "writeFileSync"

// fs
let readFile = (~path: string) => readFileSync(~path, #useAscii)
let writeFile = (~filename, ~text) => writeFileSync(~filename, ~text)
let readDir = (~path: string) => readdirSync(~path)
let makeDir = (~path: string) => mkdirSync(~path)
let removeDir = (~path: string) => rmSync(~path, ~options={"recursive": true, "force": true})

// extension
let removeFileExtension = (~filename: string) =>
  switch filename->Js.String.split(".")->Js.Array.shift {
  | Some(str) => str
  | None => ""
  }
let replaceExtension = (~filename: string, ~extension: string) =>
  removeFileExtension(~filename) ++ "." ++ extension

let capitalizeFront = (~name: string): string =>
  name->Js.String.get(0)->Js.String.toUpperCase ++
    name->Js.String.slice(~from=1, ~to_=name->Js.String.length)

let alignFormat = (~text: string) => format(text, {parser: "babel-ts"})

module Utils = {
  let readFile = readFile
  let writeFile = writeFile
  let readDir = readDir
  let makeDir = makeDir
  let removeDir = removeDir

  let removeFileExtension = removeFileExtension
  let replaceExtension = replaceExtension
  let capitalizeFront = capitalizeFront
}
