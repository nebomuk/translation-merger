var app = new Vue({ 
    el: '#app',
    data: {
        message1: 'U\n\nV\n\nW\n\nX',
        message2: "A\n\nB\n\nC\n\nD",
        paragraphToMergeFirst : 0,
        paragraphToMergeSecond : 0,
        result: ''
        },
    
  methods: {
      showResultInNewWindow : function() {
    
    console.log("opening new window");
    
    var newWindow = window.open();

    newWindow.document.body.innerHTML = this.plainTextToHtml(this.result);
    },
  
    combineTexts: function () {
        
      const splitted1 =  this.splitParagraphsFirst();
      const splitted2 = this.splitParagraphsSecond();
      
       console.log("reached");
      
     const length = Math.min(splitted1.length, splitted2.length);

    
      let stringBuilder = "";
            
      for(let i = 0; i < length; ++i)
      {
      	stringBuilder += i + ")\n" + splitted1[i] + "\n" + splitted2[i] + "\n\n";
      }
  

      this.result = stringBuilder;

    },
    splitLines: function(t) { return t.split(/\r\n|\r|\n/); },
    
    splitParagraphsFirst : function() {return this.splitLines(this.message1)
      .filter(Boolean)
      .map(line => line.trimLeft());},
      
    splitParagraphsSecond : function() {return this.splitLines(this.message2)
      .filter(Boolean)
      .map(line => line.trimLeft());},  
      
    mergeParagraphFirst : function() {

    this.message1 = this.mergeParagraph(this.splitParagraphsFirst());
    
    },
    mergeParagraphSecond : function() {
    this.message2 = this.mergeParagraph(this.splitParagraphsSecond());
    },
    mergeParagraph : function(splitted) {
    const paragraphToMerge = parseInt(this.paragraphToMergeFirst)
    splitted[paragraphToMerge] += splitted[paragraphToMerge+1];    
    splitted.splice(paragraphToMerge+1,1);
   return splitted.join("\n\n");
    },
    detectParagraphsLengthDifference : function() {},
    
    plainTextToHtml : function(text) {

var text = text.replace(/&/g, "&amp;").
    replace(/</g, "&lt;").
    replace(/>/g, "&gt;");

    text = text.replace(/\r\n?|\n/g, "<br>");

    text = text.replace(/<br>\s*<br>/g, "</p><p>");

    text = "<p>" + text + "</p>";

    return text;
}
    }
});
