var div = document.querySelector('examples');
var list = div.children;
for(var i=0; i<list.length; i++){
    list[i].onmouseover = function(){
        this.children[1].style.display = 'block';
    }
    list[i].onmouseout = function(){
        this.children[1].style.display = 'none';
    }
}