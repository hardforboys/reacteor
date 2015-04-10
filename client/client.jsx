$(document).ready(function(){

    function checkRender() {
        var ss = document.getElementById('headerMain');
        if (ss == null) {
            setTimeout(function(){
                checkRender();
                console.log('~~ RENDER LOOP TRIGGERED ~~');
                console.log('~~ ' + new Date() + ' ~~');
            },100);
        } else {
            renderReact();
        }
    }

    function renderReact() {
        React.render(
            <Navbar/>,
            document.getElementById('headerMain')
        );
    }

    checkRender();

    //var jj = $('#headerMain');
    //console.log(jj);
    /*

    */
});