# Bug Report

<!--
  Please fill in each section completely. Thank you!
-->

### 🔎 Search Terms

    in, object

<!--
  What search terms did you use when trying to find an existing bug report?
  List them here so people in the future can find this one more easily.
-->

### 🕗 Version & Regression Information

<!-- When did you start seeing this bug occur?

"Bugs" that have existed in TS for a long time are very likely to be FAQs; refer to
  https://github.com/Microsoft/TypeScript/wiki/FAQ#common-bugs-that-arent-bugs

If possible, please try testing the nightly version of TS to see if it's already been fixed.
For npm: `typescript@next`
This is also the 'Nightly' version in the playground: http://www.typescriptlang.org/play/?ts=Nightly

Note: The TypeScript Playground can be used to try older versions of TypeScript.

Please keep and fill in the line that best applies:
-->
4.3.5 and 4.4.0-beta

### ⏯ Playground Link

<!--
  A link to a TypeScript Playground "Share" link which shows this behavior

  The TypeScript Workbench can be used for more complex setups, try
  https://www.typescriptlang.org/dev/bug-workbench/

  As a last resort, you can link to a repo, but these will be slower for us to investigate.
-->
[Playground link with relevant code](https://www.typescriptlang.org/play?ts=4.4.0-beta#code/FAFwngDgpgBAYgewTAvDA3sGMB2BDAWygC4YBnEAJwEscBzLGPOk8q2hgX1ElgCE8lVBkb4ipCjXqNmrSR0YscAEyiVSOAK4EARmuDce0GABFqAM3MAeAPIAaGDYCMAPmGZsAbQDSUMDFoYAGs-BHNHJjIYAFEADwBjABtNVSsQsDCIgB9g0PDnB3TMmxgAMlyM-NcAXVJGbF9-KFiQKBUooqqYAH5HJx8-aphSRphm1vaK4p7HAbAhjSgAN31DYCNYVoonYTNLK0QEBwFKN2AAenOYC6utkB20TEvsGCVVdTYpBme1oA)

### 💻 Code

<!-- Please post the relevant code sample here as well-->
```ts

type Foo = {
    name: string
    age: string
}
type Bar = {
    name: string
    age: string
    gender: number
}

type Diff<O, O1> = {
    [Key in keyof O as Exclude<keyof O | keyof O1, keyof O & keyof O1>]:
    Key extends keyof O1 ? O1[Key] : Key extends keyof O ? O[Key] : never
}



type test1 = Diff<Foo, Bar>
// 
// test1 = {
//   gender: string
// }

```

### 🙁 Actual behavior

<!-- What happened, and why it was wrong -->

The type I get is related to `in` and cannot return its original type   

I understand `in` it's just a traversal order, but now it limits my type



Is this a correct phenomenon？


### 🙂 Expected behavior

<!-- What you expected to happen instead, and why -->

I want to be able to return the correct type


