import React from 'react';

const SneezyColor = ({text}) => {

    function colorize(t) {
        t = t.replace('\n', '<br>');
        t = t.replace('<f>',"");
        t = t.replace('<r>', '</span><span style="color:red">');
        t = t.replace('<R>', '</span><span style="color:red;font-weight:bold">');
        t = t.replace('<b>', '</span><span style="color:blue">');
        t = t.replace('<B>', '</span><span style="color:blue;font-weight:bold">');
        t = t.replace('<g>', '</span><span style="color:green">');
        t = t.replace('<G>', '</span><span style="color:green;font-weight:bold">');
        t = t.replace('<c>', '</span><span style="color:cyan">');
        t = t.replace('<C>', '</span><span style="color:cyan;font-weight:bold">');
        t = t.replace('<p>', '</span><span style="color:purple">');
        t = t.replace('<P>', '</span><span style="color:purple;font-weight:bold">');
        t = t.replace('<o>', '</span><span style="color:orange">');
        t = t.replace('<O>', '</span><span style="color:orange;font-weight:bold">');
        t = t.replace('<y>', '</span><span style="color:yellow">');
        t = t.replace('<Y>', '</span><span style="color:yellow;font-weight:bold">');
        t = t.replace('<k>', '</span><span style="color:gray">');
        t = t.replace('<K>', '</span><span style="color:gray;font-weight:bold">');
        t = t.replace('<w>', '</span><span style="color:white">');
        t = t.replace('<W>', '</span><span style="color:white;font-weight:bold">');
        t = t.replace('<z>', '</span><span style="color:white">');
        t = t.replace('<Z>', '</span><span style="color:white;font-weight:bold">');
        t = t.replace('<1>', '</span><span style="color:white">');

        //console.log(t);
        return {__html:"<span style='color:white'>" + t + '</span>'};
    }

    return (
        <div dangerouslySetInnerHTML={colorize(text)} />
        //<div>{text}</div>
    );
}

export default SneezyColor