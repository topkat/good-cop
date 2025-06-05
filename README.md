# Good Cop

              ,   
         _.-"` `'_  _________________________________________________________
     __ '._ __{}_/       __________  ____  ____     __________  ____        /\
    ||||  |'--.__\      / ____/ __ \/ __ \/ __ \   / ____/ __ \/ __ \      / /
    |  L.(   ^ \^      / / __/ / / / / / / / / /  / /   / / / / /_/ /     / /
    \ .-' |   _'|     / /_/ / /_/ / /_/ / /_/ /  / /___/ /_/ / ____/     / /
    | |   )\___/      \____/\____/\____/_____/   \____/\____/_/         / /
    |  \-'`:._] _______________________________________________________/ /
    \__/;      '-. ____________________________________________________\/

<div align="center">

> This library is actually in beta but it's used successfully in very security demanding production apps and well tested. Feel free to contact me via github to collaborate or for feature request

![Good Cop](https://raw.githubusercontent.com/yourusername/good-cop/main/logo.png)

[![npm version](https://img.shields.io/npm/v/good-cop.svg)](https://www.npmjs.com/package/good-cop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful TypeScript validation library with advanced type inference and schema generation capabilities.

</div>

## 🚀 Features

- ✨ **TypeScript Type Inference** - Automatically infer types from your schemas (Zod like syntax)
- 📝 **Type Generation** - Generate TypeScript types as strings for file generation
- 🗄️ **MongoDB Schema Generation** - Create database models from your types
- 📚 **Swagger Documentation** - Generate OpenAPI/Swagger documentation
- 🔍 **Smart Validation** - Context-aware validation (create, update, delete operations)
- 🛡️ **Type Safety** - Full TypeScript support with proper type narrowing

## 🤔 Why Good Cop?

While Zod is an excellent validation library, Good Cop was created to address specific needs:

- **Lightweight & Maintainable**: Written in a few, easy-to-maintain files
- **String Type Generation**: Built-in support for generating types as strings
- **MongoDB Integration**: Native support for MongoDB schema generation
- **Extensible**: Easy to add new features like Swagger documentation generation

## 📦 Installation

```bash
npm install good-cop
# or
yarn add good-cop
```

## 🎯 Quick Start

```typescript
import { _, InferType } from 'good-cop/frontend'

// Define a schema
const userSchema = _.object({
  name: _.string().required(),
  age: _.number().min(0).max(120),
  email: _.email().optional(),
  role: _.enum(['admin', 'user', 'guest']).required()
})

// Infer TypeScript type
type User = InferType<typeof userSchema>
```

## 📚 Advanced Usage

### MongoDB Models

```typescript
import { _, InferTypeRead, InferTypeWrite } from 'good-cop/frontend'

const _ = new Definition<{
  default: {
    [modelName: 'user' | 'organization']: any 
  }
}>({ 
  default: {
    user,
    organization
  } 
}).init()

const user = _.mongoModel(
  ['creationDate'], // Auto-created fields
  {
    firstName: _.string(),
    org: _.ref('organization')
  }
)

// Types for different operations
type UserWrite = InferTypeWrite<typeof user>  // For create/update
type UserRead = InferTypeRead<typeof user>    // For database output
```

### Complex Schemas

```typescript
const complexSchema = _.object({ 
  string: _.string().required(), 
  enum: _.enum(
    _.number().min(0).max(100).round2(),
    _.boolean()
  ),
  arr: [_.email()],
  otherArr: _.array(_.url()).maxLength(3).required(),
  subObj: {
    subField: _.genericObject('fieldName', { date: _.date() }),
    regexp: _.string().regexp(/my\sregexp/),
  }
})
```

## green_dot

Note: this project is used as a backbone for the [green_dot framework](https://github.com/topkat/green_dot)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests
- Improve documentation
- Share your use cases

## 📄 License

MIT License - feel free to use this library in your projects!
