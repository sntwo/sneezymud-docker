/*  sneezy_up.js
    convert sneezy color codes to html
 */
function sneezy_up(s){
    var mudstr = s;
    var htmlstr = '<span style=\"color:white\"><font face=\"courier\">';
    var i = 0;
    for (; i < mudstr.length - 2; i++) {
        var c = mudstr.charAt(i);
        if (c == '<' && mudstr.charAt(i+2) == '>'){
            switch (mudstr.charAt(i+1)){
                case 'r':
                    htmlstr += "</span><span style=\"color:red\">";
                    break;
                case 'R':
                    htmlstr += "</span><span style=\"color:red;font-weight:bold\">";
                    break;
                case 'b':
                    htmlstr += "</span><span style=\"color:blue\">";
                    break;
                case 'B':
                    htmlstr += "</span><span style=\"color:blue;font-weight:bold\">";
                    break;
                case 'g':
                    htmlstr += "</span><span style=\"color:green\">";
                    break;
                case 'G':
                    htmlstr += "</span><span style=\"color:green;font-weight:bold\">";
                    break;
                case 'c':
                    htmlstr += "</span><span style=\"color:cyan\">";
                    break;
                case 'C':
                    htmlstr += "</span><span style=\"color:cyan;font-weight:bold\">";
                    break;
                case 'p':
                    htmlstr += "</span><span style=\"color:purple\">";
                    break;
                case 'P':
                    htmlstr += "</span><span style=\"color:purple;font-weight:bold\">";
                    break;
                case 'o':
                    htmlstr += "</span><span style=\"color:orange\">";
                    break;
                case 'O':
                    htmlstr += "</span><span style=\"color:orange;font-weight:bold\">";
                    break;
                case 'y':
                    htmlstr += "</span><span style=\"color:yellow\">";
                    break;
                case 'Y':
                    htmlstr += "</span><span style=\"color:yellow;font-weight:bold\">";
                    break;
                case 'k':
                    htmlstr += "</span><span style=\"color:gray\">";
                case 'K':
                    htmlstr += "</span><span style=\"color:gray;font-weight:bold\">";
                    break;
                case 'w':
                    htmlstr += "</span><span style=\"color:white\">";
                    break;
                case 'W':
                    htmlstr += "</span><span style=\"color:white;font-weight:bold\">";
                    break;
                case 'z':
                    htmlstr += "</span><span style=\"color:white\">";
                    break;
                case 'Z':
                    htmlstr += "</span><span style=\"color:white\">";
                    break;
                case '1':
                    htmlstr += "</span><span style=\"color:white\">";
                    break;
                default:
                    htmlstr += '<';
                    htmlstr += c;
                    htmlstr += '>';
            }
            i += 2;
        } else {
            htmlstr += c;
        }
    }
    while (i < mudstr.length) { 
       htmlstr += mudstr.charAt(i);
       i++;
    }
    htmlstr += "</span>";
    return htmlstr;
}