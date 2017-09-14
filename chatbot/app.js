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
      let params = new URLSearchParams();
      params.append('apikey', '');
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
  }
})
