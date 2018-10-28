
function onClick() {
  var pdf = new jsPDF('p', 'pt', 'letter');
  pdf.fromHTML(document.getElementById('container'));

  pdf.save('test.pdf');
};

var element = document.getElementById("clickbind");
element.addEventListener("click", onClick);