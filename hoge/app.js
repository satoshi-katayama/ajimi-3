var app = new Vue({
  el: '#chatApp',
  data: {
    title: "Hi! Let's chat with me",
    fontStyle: {
      fontSize: "20px",
    },
    talk: "",
    talks: [],
    search_text: ""
  },
  methods: {
    talkSubmit: function() {
      // 単語抜き出し
      let r = /[一-龠]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+/g;
      word = this.talk.match(r)[0];
      this.search_text = this.talk;

      axios.get('https://api.a3rt.recruit-tech.co.jp/image_search/v1/search_by_text?apikey=' + apiKeyImageSearch  + '&query=' + word)
      .then(response => {
        this.talks.push({
          id: this.talks.length,
          icon: response.data.result.img[0]['url'],
          text: "あなた: " + this.search_text,
          doing: true,
          isBackColor: false
        })
        console.log(response.data);

        let params = new URLSearchParams();
        params.append('apikey', apikey);
        params.append('query', this.search_text);
        axios.post('https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk', params)
        .then(response => {
          this.talks.push({
            id: this.talks.length,
            icon: "ai.png",
            text: "新時代のAI: "+response.data.results[0].reply,
            doing: true,
          isBackColor: true
          })
          console.log(response.data);
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });

      this.talk = ""
    },
  }
})
