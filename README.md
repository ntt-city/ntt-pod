# ntt-pod
Entity persistence pod

## 

- Technologies

* Typescript
* [JSON Schema](https://github.com/tdegrunt/jsonschema) (for the client and Mongoose Schema in the server)
* Mongoose
* Knex
* Bookshelf
* Salesman

### Actions

__Operations over entities (CRUD)__
* Create
* Retrieve
* Update
* Discard

__Operations over documents (SFMEV)__
* Save
* Fetch
* Merge
* Erase
* Validate

### Models, schemas, storage and validations

* Generate JSON Schemas from TypeScript using Typson.
* Generate JSON Schemas from Mongoose Schemas using [mongoose-schema-jsonschema](https://github.com/DScheglov/mongoose-schema-jsonschema)

### Using mongoose with Express

```js
var memcached = ...; // From node-memcached
var mongo = ...; // From mongoose

app.get('/', function(req, res) {
    var a = null, b = null, c = null, d = null;
    memcached.get('mykey1', function(err, result) {
        if (err) {
            sys.puts('Naive error');
            return;
        }
        a = result;
        
        memcached.get('mykey2', function(err, result) {
            if (err) {
                sys.puts('Naive error');
                return;
            }
            b = result;
            
            mongo.find({name: 'Joe'}).each(function(doc) {
                // Errors handled by mongoose
                c = doc.age;
                mongo.find({name: 'Julia'}).each(function(doc) {
                    d = doc.lastname;
                    res.send('Hello World! ' + a + b + c + d);
                });
            });
        });
    });
});
```

```js
requestHandler = function(req, res){
    Step(
        function(){
            memcached.get('mykey1', this.paralell());
            memcached.get('mykey2', this.paralell());
            mongo.findOnce({name: 'Joe'}, {age: 1}, this.paralell());
            mongo.findOnce({name: 'Julia'}, {lastname: 1}, this.paralell());
        },
        function(err, a, b, joe, julia){
            if (err) {
                sys.puts('Naive error');
                return;
            }
            var c, d;
            c = joe.age;
            d = julia.lastname;
            res.send(['Hello World! ', a, b, c, d].join(''));
        }
    );
};
app.get('/', requestHandler);
```

```js
app.get('/', function(req, res){
    Step(
        function(){
            memcached.get('mykey1', this.paralell());
            memcached.get('mykey2', this.paralell());
            mongo.findOne({name:'Joe'}, this.paralell());
            mongo.findOne({name:'Julia'}, this.paralell());
        },
        function(err, a, b, c, d){ res.send(['Hello World! ', a, b, c.age, d.lastname].join('')); }
    );
});
```

```js
app.get('/', function(req, res) {
    Promises.join(
        memcached.get('mykey1'),
        memcached.get('mykey2'),
        mongo.find({name: 'Joe'}),
        mongo.find({name: 'Julia'}),
        (a, b, joedoc, juliadoc) => res.send(`Hello World! ${a} ${b} ${joedoc.age} ${juliadoc.lastname}`));
});
```
