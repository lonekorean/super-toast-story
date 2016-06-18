$(function() {
	// dialog text
	var text1 = 'He did his best, but\n' +
				'the world was not\n' +
				'ready for toast.';
	var text2 = 'And so toast flew off\n' +
				'into the stars. He\n' +
				'never came back...';
	var text3 = 'He put on a smile,\n' +
				'but he missed his\n' +
				'friends dearly.';

	// cache jQuery wrappers
	var $body = $('body');
	var $getReady = $('.get-ready');
	var $splash = $('.splash');
	var $start = $('.start');
	var $toast = $('.toast');
	var $dialog = $('.dialog');
	var $audio = $('audio');

	// cache audio elements
	var music = document.getElementById('music');
	var typing = document.getElementById('typing');

	// other vars
	var preloadsRemaining;

	startPreloads();

	function startPreloads() {
		preloadsRemaining = 0;
		$audio.each(addPreload);
		checkPreloadsRemaining();
	}

	function addPreload(index, audio) {
		if (audio.readyState !== 4) {
			preloadsRemaining++;
			audio.addEventListener('canplaythrough', decrementPreloadsRemaining, false);
		}
	}

	function decrementPreloadsRemaining() {
		preloadsRemaining--;
		checkPreloadsRemaining();
	}

	function checkPreloadsRemaining() {
		if (preloadsRemaining === 0) {
			handleReady();
		}
	}

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
		setTimeout(flyUp, 27500); // wait for music to change
		setTimeout(flyAcross, 39300); // wait for fly up to finish
		setTimeout(startDialog.bind(this, text2), 52000); // after flying for a bit
		setTimeout(startDialog.bind(this, text3), 90000); // later
	}

	function flyUp() {
		$body.addClass('darken fly-up');
	}

	function flyAcross() {
		$body
			.removeClass('fly-up')
			.addClass('fly-across');
	}

	function startDialog(text) {
		$dialog.show();
		setTimeout(continueDialog.bind(this, text), 2000); // wait for dialog grow in
	}

	function continueDialog(text) {
		var char = text.charAt(0);
		$dialog.append(char);

		if (/\S/.test(char)) {
			typing.play();
		}

		text = text.slice(1);
		if (text.length > 0) {
			setTimeout(continueDialog.bind(this, text), 250);
		} else {
			setTimeout(closeDialog, 5000);
		}
	}

	function closeDialog() {
		$dialog
			.hide()
			.empty();
	}
});
