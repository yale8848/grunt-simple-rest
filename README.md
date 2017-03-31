# grunt-simple-rest

> grunt simple rest http utils to verify api

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-simple-rest --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-simple-rest');
```

```js
 grunt.registerTask('default', ['simple_rest']);
```

```js
 grunt.registerTask('default', ['simple_rest:simple']);
```
## The "simple_rest" task

### Overview
In your project's Gruntfile, add a section named `simple_rest` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  simple_rest: {
    simple: {
       async: true,
       protocol: 'http',
       hosts: ['11.22.33.11'],
       interrupt: false,
       count: 5,
       timeout: 3000,
       timeGap: 1000,
       url: ['/test', '/test2','http://11.111.11.11/test']
    }
  },
});
```

### simple intro

#### simple.async

Type: `boolean`

Default value: `true`

whether http requset parallel

#### simple.protocol

Type: `String`

Default value: `http`

http protocol

#### simple.hosts

Type: `Array`

http hosts list


#### simple.interrupt

Type: `boolean`

Default value: `false`

whether exit if have error


#### simple.count

Type: `int`

Default value: `5`

how many count does each http request 



#### simple.timeout

Type: `int`

Default value: `3000` ms

timeout of each http request start


#### simple.timeGap

Type: `int`

Default value: `1000`

how much time of each two http request gap



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
