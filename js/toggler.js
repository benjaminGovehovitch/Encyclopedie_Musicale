<script>
/* <![CDATA[ */ 
/*
|-----------------------------------------------------------------------
|  jQuery Toggle Script by Matt - skyminds.net
|-----------------------------------------------------------------------
|
| Affiche/cache le contenu d'un bloc une fois qu'un lien est cliqué.
|
*/

// On attend que la page soit chargée 
jQuery(document).ready(function()
{
   // On cache la zone de texte
   jQuery('#toggle').hide();
   // toggle() lorsque le lien avec l'ID #toggler est cliqué
   jQuery('a#toggler').click(function()
  {
      jQuery('#toggle').toggle(400);
      return false;
   });
});
/* ]]> */ 
</script>
