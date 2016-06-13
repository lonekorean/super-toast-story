$(function() {
	var text1 = 'And so toast flew off\n' +
				'into the stars.\n' +
				'He never came back...';

	var $getReady = $('.get-ready');
	var $splash = $('.splash');
	var $start = $('.start');
	var $toast = $('.toast');
	var $dialog = $('.dialog');

	var music = document.getElementById('music');
	if (music.readyState === 4) {
		setTimeout(handleReady, 1000);
	} else {
		music.addEventListener('canplaythrough', handleReady, false);
	}

	var letter = document.getElementById('letter');

	function handleReady() {
		$getReady.hide();
		$splash.show();

		$start.on('click', handleStart);
	}

	function handleStart() {
		$splash.hide();
		$toast.show();

		music.play();
		setTimeout(startDialog.bind(this, text1), 6000); // wait for toast fade in
	}

	function startDialog(text) {
		$dialog.show();
		setTimeout(continueDialog.bind(this, text), 2000);
	}

	function continueDialog(text) {
		var char = text.charAt(0);
		$dialog.append(char);

		if (/\S/.test(char)) {
			letter.play();
		}

		text = text.slice(1);
		if (text.length > 0) {
			setTimeout(continueDialog.bind(this, text), 250);
		}
	}
});
