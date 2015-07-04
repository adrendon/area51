$(function(){
    $( "#dialog:ui-dialog" ).dialog( "destroy" );
    $( "#dialog" ).dialog({
        title: '¡Actualizate!',
	height: 240,
	width: 560,
	modal: true,
        show: 'drop'
    });
});