# Functions

Functions in Functional Programming are:
 - Deterministic: one input value must produce only one output value.
 - Total: functions are defined for all universe of input values (!= partial functions -> ex function divide cannot accept zero).
 - Pure: does not produce side effects (are deterministic and total).
 - Immutable: never mutate or change values.
 - Referential Transparency: possibility to replace functions with its definition (increase optimizations, tests, concurrency and parallelism).
