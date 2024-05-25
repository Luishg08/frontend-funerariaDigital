function IniciarMenuLateral(){
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sr-only');
        var instances = M.Sidenav.init(elems, {
        });
    })
}

IniciarMenuLateral();