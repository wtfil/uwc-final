jQuery(function(){
	jQuery('.b-resume textarea').autosize();
	jQuery('textarea').live('click', function(e){
		var curr = jQuery(e.currentTarget);
		if(curr.attr('readonly') !== undefined) curr.removeAttr('readonly');
		else curr.attr('readonly', 'readonly');
	})
});
