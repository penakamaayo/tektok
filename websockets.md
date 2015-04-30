# Introduction to Websockets

## Agenda

 * Protocol
 * API
 * Faye
 * Demo

### What are websockets?
* RFC 6455
* WebSocket is a protocol providing full-duplex communication channels over a single TCP connection.


### Protocol details
* TCP-based protocol
* http used solely for upgrade request
* Persistent, Bi-directional, full-duplex


### What's so great about Websockets?

* Http is half-duplex; Websocket is Asynchronous & full-duplex
* So, a little less of this..
<img src='http://cdn2.hubspot.net/hub/401413/file-2232518086-jpg/loading-screen.jpg' width='500'>
* Http adds latency..


### Why do we need Websockets?
* Web apps need to communicate with the server in real-time
  * Can't we already do that? ..sort of
    * Ajax polling
      <img src='http://i.stack.imgur.com/qlMEU.png' width='500'>
    * Ajax long polling
      <img src='http://i.stack.imgur.com/zLnOU.png' width='500'>

### How does this work?
<img src='https://s-media-cache-ak0.pinimg.com/originals/bd/97/78/bd977861d73354b5e87dbf0b5ff3d431.jpg' width ='500'>

### Usual suspects?
* chat
* gaming
* collaboration
* social networking

## The API

### Websocket events
* onOpen
  * when a new ws connection happens
* onMessage
  * when a ws message is received
* onClose
  * when a ws connection is closed


## Faye websocket
* Simple pub/sub messaging

#### Handling websocket connections in Rack

```ruby
  require 'faye/websocket'

  App = lambda do |env|
      if Faye::WebSocket.websocket?(env)
      ws = Faye::WebSocket.new(env)

      ws.on :message do |event|
        ws.send(event.data)
      end

      ws.on :close do |event|
        p [:close, event.code, event.reason]
        ws = nil
      end

      # Return async Rack response
      ws.rack_response

    else
      # Normal HTTP request
      [200, {'Content-Type' => 'text/plain'}, ['Hello']]
    end
   end
```


#### Javascript API

```javascript
  var myWebSocket = new WebSocket("ws://www.websockets.org");

  myWebSocket.onopen = function(evt){
    alert('Connection open ...');
  };
    myWebSocket.onmessage = function(evt){
      alert( 'Received Message: '  +  evt.data );
    };
    myWebSocket.onclose = function(evt) {
      alert('Connection closed.');
    };

    myWebSocket.send('Hello WebSockets!');
    myWebSocket.close();
```



# Show me the Demo!!
<http://penyakatokitok.herokuapp.com>

### References
* <http://en.wikipedia.org/wiki/WebSocket>
* <https://www.websocket.org/aboutwebsocket.html>
* <http://faye.jcoglan.com/>
* <https://github.com/faye/faye-websocket-ruby>
* <https://devcenter.heroku.com/articles/ruby-websockets>
* <http://www.rubydoc.info/gems/faye-websocket/0.9.2>
* <http://www.sinatrarb.com/>
