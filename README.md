# ajimi #3 Vue.js + A3RT TalkAPI

Vue.jsを使ったBotとチャットするアプリケーションを作成

TalkAPIというリクルートが無料提供しているAPIを使います。<br >
[A3RT（アート）](https://a3rt.recruit-tech.co.jp/)

## 1.事前準備
- このプロジェクトをローカルにクローンする
- curl (インストールしてない場合)
- npm (インストールしてない場合) ※おまけの「vue-cli」で使います

## 2.TalkAPIを利用するためのAPI KEYを発行

https://a3rt.recruit-tech.co.jp/product/talkAPI/ <br >
上記URLからAPI KEYを発行してください。

API KEYを取得できたら、試しにTalkAPIを叩いてみましょう。

```
curl -X POST https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk \
-F "apikey=xxxxxxxxxxxxxxxxxxxxxxx" \
-F "query=おはよう"
```

レスポンスが文字化けしていたらJSONパーサのjqを入れる良いです
```
brew install jq
```

```
curl -X POST https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk \
-F "apikey=xxxxxxxxxxxxxxxxxxxxxxx" \
-F "query=おはよう" | jq
```



## 3.Vue.jsを触ってみる
### [Vue.js 公式サイト](https://jp.vuejs.org/index.html)<br >

##### Vue.jsの利用パターン

 1. scriptタグの埋め込み
 2. vue-cli
 3. npmモジュールの利用（webpack, browserify等)

今回は1の「scriptタグの埋め込み」の方法で進めます。

## ※以下、公式サイトから一部抜粋

##### 宣言的レンダリング
hello_vue/index.htmlのbodyタグ内に以下を追加してブラウザで表示
```
<body>
  <div id="app">
    {{ message }}
  </div>
  <script src="app.js"></script>
</body>
```

app.jsを最後に読み込んでください。

hello_vue/app.jsの中身に以下を追加してブラウザで表示
```
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```


##### 条件分岐
hello_vue/index.html
```
<body>
...

  <div id="app-2">
    <p v-if="seen">Now you see me</p>
  </div>

  <script src="app.js"></script>
</body>
```
hello_vue/app.js
```
var app2 = new Vue({
  el: '#app-2',
  data: {
    seen: true
  }
})
```
ブラウザで確認


ブラウザのインスペクタからコンソールで
app2.seen = false
と入力してみる


##### ループ
hello_vue/index.html
```
<body>
...

  <div id="app-3">
    <ol>
      <li v-for="f in fruits">
        {{ f.text }}
      </li>
    </ol>
  </div>

  <script src="app.js"></script>
</body>
```

hello_vue/app.js
```
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
```
ブラウザで確認

コンソールから以下を入力
app3.fruits.push({ text: 'melon' })

#### フォーム入力バインディング
hello_vue/index.html
```
<body>
...
  <div id="app-4">
    <input v-model="message">
    <p>{{ message }}</p>
  </div>

  <script src="app.js"></script>
</body>
```

hello_vue/app.js
```
var app4 = new Vue({
  el: '#app-4',
  data: {
    message: 'Hello Vue!'
  }
})
```
ブラウザで確認


##### イベントハンドリング
hello_vue/index.html
```
<body>
...

  <div id="example-1">
    <button v-on:click="counter += 1">Add 1</button>
    <p>button above has been clicked {{ counter }} times.</p>
  </div

  <script src="app.js"></script>
</body>
```
hello_vue/app.js
```
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```
ブラウザで確認


今度はメソッドにしてみます。
```
<body>
...

  <div id="example-2">
    <button v-on:click="countUp">Add 3</button>
    <p>The button above has been clicked {{ counter }} times.</p>
  </div>


  <script src="app.js"></script>
</body>
```

```
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

```
ブラウザで確認


## TalkAPIを使って１人チャットアプリケーションを作成

chatbot/index.html
inputタグにv-modelを追加
buttonタグにv-on:clickを追加


```
<div id="chatApp">
  <h2 v-bind:style="fontStyle">{{ title }}</h2>
  <input type="text" v-model="talk">
  <button type="button" v-on:click="talkSubmit">送信</button>
</div>

```
chatbot/app.js
methods内に以下を追記
```
var app = new Vue({
  el: '#chatApp',
  data: {
    title: "Hi! Let's chat with me",
    fontStyle: {
      fontSize: "20px",
    },
    talk: "",
    talks: []
  },
  methods: {
    talkSubmit: function() {
      this.talks.push({
        id: this.talks.length,
        text: "you: "+this.talk,
        isBackColor: false
      })
      this.talk = ""
    },
  }
})
```

chatbot/index.html
ulタグに内に入力文字を表示させる
```
<ul>
  <li v-for="t in talks" :key="t.id" v-bind:class="['todo-default', t.isBackColor ? 'back-color' : '']" >
    {{t.text}}
  </li>
</ul>
```

ブラウザで確認


talkAPIからの返答させる

chatbot/app.js

```
...
methods: {
  talkSubmit: function() {
    this.talks.push({
      id: this.talks.length,
      text: "you: "+this.talk,
      doing: false,
      isBackColor: false
    })
    let params = new URLSearchParams();
    params.append('apikey', 'xxxxxxxxxxxxxxxxxxxxxxx');
    params.append('query',this.talk );
    axios.post('https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk', params)
    .then(response => {
      this.talks.push({
        id: this.talks.length,
        text: "bot: "+response.data.results[0].reply,
        doing: true,
      isBackColor: true
      })
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
    this.talk = ""
  },
  ...
  ```

  ブラウザで確認


## おまけ vue-cliを使ってみる

#### vue-cliのインストール

```
$ npm install -g vue-cli
```

#### プロジェクト作成
ajimi-3ディレクトリ上で作成
```
$ vue init webpack vue-cli
# いろいろ聞かれるがとりあえずenter連打
$ cd vue-cli
$ npm install
$ npm run dev

```

ブラウザで http://localhost:8080/ にアクセスしてサンプルを表示
