"use client"

// Comprehensive course content for all languages
export const courseContent = {
  python: {
    name: "Python",
    icon: "🐍",
    description: "Master Python from basics to advanced concepts",
    lessons: [
      {
        id: "python-1",
        title: "Introduction to Python",
        level: "beginner",
        duration: 45,
        content: `
# Python Basics

Python is a beginner-friendly, versatile language. Here's what makes it special:

## Why Python?
- Easy to read and learn
- Powerful for data science, web development, and automation
- Huge community and libraries

## Your First Program
\`\`\`python
print("Hello, World!")
\`\`\`

## Variables and Data Types
Python dynamically types variables:

\`\`\`python
name = "Alice"           # String
age = 25                 # Integer
height = 5.6             # Float
is_student = True        # Boolean
\`\`\`

## Comments
\`\`\`python
# This is a single-line comment
'''
This is a multi-line comment
Used for longer explanations
'''
\`\`\`

## Best Practices
- Use clear, descriptive variable names
- Follow PEP 8 style guide
- Write comments for complex logic
        `,
        practice: "Write a program that prints your name and age",
      },
      {
        id: "python-2",
        title: "Control Flow: If, Else, Elif",
        level: "beginner",
        duration: 50,
        content: `
# Control Flow

Making decisions in your code:

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")
\`\`\`

## Comparison Operators
- == (equal)
- != (not equal)
- > (greater than)
- < (less than)
- >= (greater than or equal)
- <= (less than or equal)

## Logical Operators
- and (both conditions true)
- or (at least one condition true)
- not (negates condition)

## Nested Conditions
\`\`\`python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Your grade: {grade}")
\`\`\`
        `,
        practice: "Create a program that determines if a number is positive, negative, or zero",
      },
      {
        id: "python-3",
        title: "Loops: For and While",
        level: "beginner",
        duration: 55,
        content: `
# Loops

Repeat code multiple times:

## For Loops
\`\`\`python
for i in range(5):
    print(f"Count: {i}")

# Output: 0, 1, 2, 3, 4
\`\`\`

## Loop Over Lists
\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")
\`\`\`

## While Loops
\`\`\`python
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1
\`\`\`

## Break and Continue
\`\`\`python
for i in range(10):
    if i == 5:
        break  # Exit loop
    if i == 2:
        continue  # Skip this iteration
    print(i)
\`\`\`

## Best Practices
- Use for loops when you know the number of iterations
- Use while loops for unknown number of iterations
- Always ensure loops eventually terminate
        `,
        practice: "Write a program that prints the times table for a number",
      },
      {
        id: "python-4",
        title: "Functions and Scope",
        level: "intermediate",
        duration: 60,
        content: `
# Functions

Reusable blocks of code:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)
\`\`\`

## Function Parameters
\`\`\`python
# Positional parameters
def add(a, b):
    return a + b

# Default parameters
def power(base, exponent=2):
    return base ** exponent

# *args for multiple arguments
def sum_all(*numbers):
    return sum(numbers)

# **kwargs for keyword arguments
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")
\`\`\`

## Variable Scope
\`\`\`python
x = "global"

def function():
    x = "local"
    print(x)  # Output: local

function()
print(x)  # Output: global
\`\`\`

## Docstrings
\`\`\`python
def add(a, b):
    """
    Add two numbers and return the result.
    
    Args:
        a: First number
        b: Second number
    
    Returns:
        Sum of a and b
    """
    return a + b
\`\`\`
        `,
        practice: "Create a function that calculates factorial of a number",
      },
      {
        id: "python-5",
        title: "Data Structures: Lists, Tuples, Dicts",
        level: "intermediate",
        duration: 70,
        content: `
# Data Structures

Organize your data efficiently:

## Lists (Mutable)
\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.remove("banana")
fruits[0] = "apricot"
print(len(fruits))  # Length
\`\`\`

## Tuples (Immutable)
\`\`\`python
coordinates = (10, 20)
# coordinates[0] = 15  # Error!

# Unpacking
x, y = coordinates
\`\`\`

## Dictionaries
\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

person["job"] = "Engineer"
print(person["name"])

for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

## Sets (Unique values)
\`\`\`python
colors = {"red", "green", "blue"}
colors.add("yellow")
colors.remove("green")
\`\`\`

## List Comprehension
\`\`\`python
squares = [x**2 for x in range(10)]
even_numbers = [x for x in range(20) if x % 2 == 0]
\`\`\`
        `,
        practice: "Create a dictionary to store student grades and calculate the average",
      },
    ],
  },
  javascript: {
    name: "JavaScript",
    icon: "⚡",
    description: "Learn the language of web development",
    lessons: [
      {
        id: "js-1",
        title: "JavaScript Fundamentals",
        level: "beginner",
        duration: 50,
        content: `
# JavaScript Basics

JavaScript powers interactive web pages:

## Variables and Types
\`\`\`javascript
let name = "Alice";           // String
const age = 25;               // Constant number
var isStudent = true;         // Boolean

// Data types
typeof name;                  // "string"
typeof age;                   // "number"
typeof isStudent;             // "boolean"
\`\`\`

## Your First Program
\`\`\`javascript
console.log("Hello, World!");
alert("Welcome to JavaScript!");
document.write("Hello!");
\`\`\`

## String Operations
\`\`\`javascript
let greeting = "Hello";
console.log(greeting.length);
console.log(greeting.toUpperCase());
console.log(greeting.includes("ell"));

// Template literals
let user = "Alice";
console.log(\`Welcome, \${user}!\`);
\`\`\`

## Best Practices
- Use \`let\` or \`const\` instead of \`var\`
- Use meaningful variable names
- Use \`const\` by default
        `,
        practice: "Create a program that welcomes a user with their name",
      },
      {
        id: "js-2",
        title: "Functions and Closures",
        level: "intermediate",
        duration: 65,
        content: `
# Functions in JavaScript

Functions are first-class citizens:

\`\`\`javascript
// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function (ES6)
const multiply = (a, b) => a * b;
\`\`\`

## Closures
\`\`\`javascript
function outer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

## Default Parameters
\`\`\`javascript
function power(base, exponent = 2) {
  return Math.pow(base, exponent);
}

console.log(power(3));    // 9
console.log(power(3, 3)); // 27
\`\`\`
        `,
        practice: "Create a function that returns another function for calculating discounts",
      },
    ],
  },
  typescript: {
    name: "TypeScript",
    icon: "💙",
    description: "Add type safety to JavaScript",
    lessons: [
      {
        id: "ts-1",
        title: "TypeScript Fundamentals",
        level: "intermediate",
        duration: 60,
        content: `
# TypeScript Basics

TypeScript = JavaScript + Types

## Basic Types
\`\`\`typescript
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;
let anything: any = "could be anything";
\`\`\`

## Type Inference
\`\`\`typescript
let count = 42;  // TypeScript infers: number
// count = "hello";  // Error!
\`\`\`

## Functions with Types
\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}

const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};
\`\`\`

## Interfaces
\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string;  // Optional
}

const user: User = {
  name: "Alice",
  age: 25
};
\`\`\`
        `,
        practice: "Create an interface for a Product and use it in functions",
      },
    ],
  },
  react: {
    name: "React",
    icon: "⚛️",
    description: "Build interactive UIs with React",
    lessons: [
      {
        id: "react-1",
        title: "React Basics and Components",
        level: "intermediate",
        duration: 70,
        content: `
# React Fundamentals

Build interactive user interfaces:

## Your First Component
\`\`\`jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}

export default Welcome;
\`\`\`

## Props
\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Alice" />
\`\`\`

## State with Hooks
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook
\`\`\`jsx
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data here
    console.log("Component mounted");
    
    return () => {
      console.log("Component unmounted");
    };
  }, []); // Dependency array
  
  return <div>{data}</div>;
}
\`\`\`
        `,
        practice: "Create a Counter component that increments on button click",
      },
    ],
  },
  java: {
    name: "Java",
    icon: "☕",
    description: "Learn object-oriented programming",
    lessons: [
      {
        id: "java-1",
        title: "Java Basics",
        level: "beginner",
        duration: 55,
        content: `
# Java Fundamentals

Object-oriented programming language:

## Your First Program
\`\`\`java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
\`\`\`

## Variables and Types
\`\`\`java
String name = "Alice";
int age = 25;
double height = 5.6;
boolean isStudent = true;
\`\`\`

## Control Flow
\`\`\`java
if (age >= 18) {
  System.out.println("Adult");
} else {
  System.out.println("Minor");
}

for (int i = 0; i < 5; i++) {
  System.out.println(i);
}
\`\`\`

## Classes
\`\`\`java
public class Person {
  private String name;
  private int age;
  
  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
  
  public void greet() {
    System.out.println("Hello, " + name);
  }
}
\`\`\`
        `,
        practice: "Create a Student class with methods to display student info",
      },
    ],
  },
  golang: {
    name: "Go",
    icon: "🔵",
    description: "Fast and concurrent programming",
    lessons: [
      {
        id: "go-1",
        title: "Go Basics",
        level: "intermediate",
        duration: 60,
        content: `
# Go Programming

Simple, efficient, and concurrent:

## Hello, Go!
\`\`\`go
package main

import "fmt"

func main() {
  fmt.Println("Hello, Go!")
}
\`\`\`

## Variables
\`\`\`go
var name string = "Alice"
age := 25  // Short declaration

const pi = 3.14159
\`\`\`

## Functions
\`\`\`go
func add(a, b int) int {
  return a + b
}

func getCoordinates() (int, int) {
  return 10, 20
}

x, y := getCoordinates()
\`\`\`

## Goroutines (Concurrency)
\`\`\`go
go func() {
  fmt.Println("Running concurrently!")
}()
\`\`\`
        `,
        practice: "Write a program that uses goroutines to print numbers concurrently",
      },
    ],
  },
  rust: {
    name: "Rust",
    icon: "🦀",
    description: "Safe and fast systems programming",
    lessons: [
      {
        id: "rust-1",
        title: "Rust Basics",
        level: "intermediate",
        duration: 65,
        content: `
# Rust Fundamentals

Systems programming with memory safety:

## Hello, Rust!
\`\`\`rust
fn main() {
  println!("Hello, Rust!");
}
\`\`\`

## Variables and Ownership
\`\`\`rust
let mut x = 5;
x = 10;

let s1 = String::from("hello");
let s2 = s1;  // s1's value is moved to s2

// Use references to avoid moving
let s3 = String::from("world");
let len = calculate_length(&s3);
\`\`\`

## Functions
\`\`\`rust
fn add(a: i32, b: i32) -> i32 {
  a + b
}

fn main() {
  let result = add(5, 3);
  println!("Result: {}", result);
}
\`\`\`

## Pattern Matching
\`\`\`rust
match number {
  1 => println!("One"),
  2 => println!("Two"),
  _ => println!("Other"),
}
\`\`\`
        `,
        practice: "Create a Rust program that calculates factorial using pattern matching",
      },
    ],
  },
  cpp: {
    name: "C++",
    icon: "⚙️",
    description: "Powerful systems programming",
    lessons: [
      {
        id: "cpp-1",
        title: "C++ Basics",
        level: "intermediate",
        duration: 70,
        content: `
# C++ Programming

Efficient and powerful language:

## Hello, C++!
\`\`\`cpp
#include <iostream>

int main() {
  std::cout << "Hello, C++!" << std::endl;
  return 0;
}
\`\`\`

## Variables
\`\`\`cpp
int age = 25;
double height = 5.6;
std::string name = "Alice";
bool isStudent = true;
\`\`\`

## Functions
\`\`\`cpp
int add(int a, int b) {
  return a + b;
}

int main() {
  int result = add(5, 3);
  std::cout << result << std::endl;
}
\`\`\`

## Classes
\`\`\`cpp
class Person {
private:
  std::string name;
  int age;
public:
  Person(std::string n, int a) : name(n), age(a) {}
  
  void greet() {
    std::cout << "Hello, " << name << std::endl;
  }
};
\`\`\`
        `,
        practice: "Create a Vector class with operations for 2D coordinates",
      },
    ],
  },
}

export const languages = Object.values(courseContent).map((lang) => {
  // Transform course content into language data structure
  return {
    id: Object.entries(courseContent).find(([_, value]) => value.name === lang.name)?.[0] || "",
    name: lang.name,
    icon: lang.icon,
    description: lang.description,
    lessons: lang.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      level: lesson.level,
      duration: lesson.duration,
      description: lesson.content.split("\n")[0] || lesson.title,
      content: lesson.content,
      difficulty: lesson.level,
      codeExample: `// ${lesson.title}\n// See lesson content for examples`,
      exercise: {
        instructions: lesson.practice,
        starterCode: `// TODO: Solve this challenge\n// ${lesson.practice}`,
        solution: `// Solution for: ${lesson.practice}\n// [Solution code here]`,
        tests: [{ input: "test", expected: "expected output" }],
      },
      proTips: [
        `Focus on the fundamentals of ${lesson.title}`,
        "Practice with different examples",
        "Break down complex problems into smaller parts",
      ],
      bestPractices: ["Write clean, readable code", "Use meaningful variable names", "Add comments for clarity"],
    })),
  }
})

export function getLanguageById(id: string) {
  return languages.find((lang) => lang.id === id)
}

export const challenges = [
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    description: "Classic programming challenge",
    languages: ["python", "javascript", "java", "cpp"],
    difficulty: "easy",
    points: 50,
  },
  {
    id: "palindrome",
    title: "Palindrome Checker",
    description: "Check if a string is a palindrome",
    languages: ["python", "javascript", "rust"],
    difficulty: "easy",
    points: 75,
  },
  {
    id: "fibonacci",
    title: "Fibonacci Sequence",
    description: "Generate Fibonacci numbers",
    languages: ["python", "javascript", "java", "go"],
    difficulty: "medium",
    points: 100,
  },
  {
    id: "binarysearch",
    title: "Binary Search",
    description: "Implement efficient search algorithm",
    languages: ["python", "java", "cpp", "rust"],
    difficulty: "medium",
    points: 150,
  },
]
