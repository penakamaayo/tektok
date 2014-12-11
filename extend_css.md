# The Extend Concept

> Inheritance. I want this selector to inherit the styles from this selector.




## Basic Usage

``` sass
.foo {
  color: red;
}
.bar {
  @extend .foo;
}
```

Output:

``` css
.foo, .bar {
  color: red;
}
```

__Note:__ that it doesn't "go get" the styles from .foo and insert them below into .bar, thus duplicating the styles. Instead it comma separates the original selector, applying the styles to both more efficiently.

``` css
.form-control, select, input[type=text],
input[type=email],
input[type=password], textarea {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.428571429;
  color: #555555;
  background-color: white;
  background-image: none;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
```
