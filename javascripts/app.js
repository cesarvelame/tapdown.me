var you_scroll;
var opp_scroll;

// rw: the iScroll would become unaligned if the window changed size
// when in poison view. to fix this, when the window is resized, refresh 
// the iScroll and scroll to poison
$(window).resize(function(){
	if ($.your_current_view !== 'life'){
		you_scroll.refresh();
		you_scroll.scrollToElement('.poison', 150);
	}
	if ($.opp_current_view !== 'life'){
		opp_scroll.refresh();
		opp_scroll.scrollToElement('.poison', 150);
	}
});

$(document).ready(function(){
	var your_life = +$.cookie('your_life');
	var opp_life = +$.cookie('opp_life');

	if (!your_life){
		your_life = 20;
	}

	if (!opp_life){
		opp_life = 20;
	}

	var your_poison = +$.cookie('your_poison');
	var opp_poison = +$.cookie('opp_poison');

	if (!your_poison){
		your_poison = 0;
	}

	if (!opp_poison){
		opp_poison = 0;
	}

	$.your_current_view = 'life';
	$.opp_current_view = 'life';

	$('#you .number').html(your_life);
	$('#you .poison').html(your_poison);
	$('#opponent .number').html(opp_life);
	$('#opponent .poison').html(opp_poison);

	// rw: Based on the current view (life or poison) and which button was tapped
	// (you or your opponent? up or down?), update the counter
	$('#you_add').fastClick(function(){
		if ($.your_current_view == 'life'){
			your_life = your_life + 1;
			$('#you .number').html(your_life);
			update_life_cookie('your_life', your_life);
		}else if ($.your_current_view == 'poison'){
			your_poison = your_poison + 1;
			$('#you .poison').html(your_poison);
			update_life_cookie('your_poison', your_poison);
		}
	});

	$('#you_subtract').fastClick(function(){
		if ($.your_current_view == 'life'){
			your_life = your_life - 1;
			$('#you .number').html(your_life);
			update_life_cookie('your_life', your_life);
		}else if ($.your_current_view == 'poison'){
			your_poison = your_poison - 1;
			$('#you .poison').html(your_poison);
			update_life_cookie('your_poison', your_poison);
		}
	});

	$('#opponent_add').fastClick(function(){
		if ($.opp_current_view == 'life'){
			opp_life = opp_life + 1;
			$('#opponent .number').html(opp_life);
			update_life_cookie('opp_life', opp_life);
		}else if ($.opp_current_view == 'poison'){
			opp_poison = opp_poison + 1;
			$('#opponent .poison').html(opp_poison);
			update_life_cookie('opp_poison', opp_poison);
		}
	});

	$('#opponent_subtract').fastClick(function(){
		if ($.opp_current_view == 'life'){
			opp_life = opp_life - 1;
			$('#opponent .number').html(opp_life);
			update_life_cookie('opp_life', opp_life);
		}else if ($.opp_current_view == 'poison'){
			opp_poison = opp_poison - 1;
			$('#opponent .poison').html(opp_poison);
			update_life_cookie('opp_poison', opp_poison);
		}
	});

	function update_life_cookie(what, value){
		$.cookie(what, value, { expires: 3, path: '/' });
	}

	// rw: set the counters back to default
	$('#reset').fastClick(function(){
		your_life = 20;
		opp_life = 20;

		your_poison = 0;
		opp_poison = 0;

		$('.number').html('20');
		$('.poison').html('0');

		$.removeCookie('your_life', { path: '/' });
		$.removeCookie('your_poison', { path: '/' });
		$.removeCookie('opp_life', { path: '/' });
		$.removeCookie('opp_poison', { path: '/' });
	});

	// rw: create iScrolls for sexy swiping
	you_scroll = new iScroll('you_wrap', {
		snap: 'div',
		momentum: false,
		hScrollbar: false,
		vScrollbar: false,
		vScroll: false,
		onTouchEnd: function(){
	        update_view('you', this.dirX);
	    }
	});

	opp_scroll = new iScroll('opp_wrap', {
		snap: 'div',
		momentum: false,
		hScrollbar: false,
		vScrollbar: false,
		vScroll: false,
		onTouchEnd: function(){
	        update_view('opponent', this.dirX);
	    }
	});
	

	// rw: Based on who swiped, what direction, and what the current view is, update the view.
	function update_view(who, dir){
		if (who == 'you'){
			if (($.your_current_view == 'life') && (dir == 1)){
				$.your_current_view = 'poison';
				$('#you .poison_icon').addClass('show');
			}else if (($.your_current_view == 'poison') && (dir == -1)){
				$.your_current_view = 'life';
				$('#you .poison_icon').removeClass('show');
			}
		}else if (who == 'opponent'){
			if (($.opp_current_view == 'life') && (dir == 1)){
				$.opp_current_view = 'poison';
				$('#opponent .poison_icon').addClass('show');
			}else if (($.opp_current_view == 'poison') && (dir == -1)){
				$.opp_current_view = 'life';
				$('#opponent .poison_icon').removeClass('show');
			}
		}
	}
});