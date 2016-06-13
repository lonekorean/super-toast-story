$(function() {
	var text1 = 'And so toast flew off into the stars. He never came back...';

	var $getReady = $('.get-ready');
	var $start = $('.start');
	var $toast = $('.toast');
	var $dialog = $('.dialog');

	var music = document.getElementById('music');
	if (music.readyState === 4) {
		setTimeout(handleReady, 1000);
	} else {
		music.addEventListener('canplaythrough', handleReady, false);
	}

	function handleReady() {
		$getReady.hide();
		$start.show();

		$start.on('click', handleStart);
	}

	function handleStart() {
		$start.hide();
		$toast.show();

		music.play();
		setTimeout(startDialog.bind(this, text1), 10000); // wait for toast fade in
	}

	function startDialog(text) {
		$dialog.show();
		setTimeout(continueDialog.bind(this, text), 2000);
	}

	function continueDialog(text) {
		$dialog.append(text.charAt(0));
		var text = text.slice(1);
		if (text.length > 0) {
			setTimeout(continueDialog.bind(this, text), 250);
		}
	}
});
