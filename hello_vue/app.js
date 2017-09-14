// Hi
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    seen: false
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    fruits: [
      { text: 'apple' },
      { text: 'orange' },
      { text: 'banana' }
    ]
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    message: 'Hello Vue!'
  }
})

var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})

var example2 = new Vue({
  el: '#example-2',
  data: {
    counter: 0
  },
  // `methods` オブジェクトの下にメソッドを定義する
  methods: {
    countUp: function () {
      // メソッド内の `this` は、 Vue インスタンスを参照します
      this.counter += 3
    }
  }
})
