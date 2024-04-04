$(document).ready(function() {
    $("nav a").click(function(event) {
        event.preventDefault();

        var pagina = $(this).attr("href");
        cargarPagina(pagina);
    });
});

function cargarPagina(pagina) {
    $("#contenido").load(pagina);
}
