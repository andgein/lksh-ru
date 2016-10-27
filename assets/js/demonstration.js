$(document).ready(function(){
	var letterNCode = 78;
	var needLetterNCount = 4;
	var letterNCount = 0;

	$.fn.isScrolledIntoView = function() {
	    var $element = this;

	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $element.offset().top;
	    var elemBottom = elemTop + $element.height();

	    return elemBottom <= docViewBottom && elemTop >= docViewTop;
	}

	var objectIndex = 0;
	var objectStep = 0;

	var runDemonstration = function() {
		console.info('Run demonstration for object ', objectIndex, ', step', objectStep);
		var $steps = $('.demonstration.demonstration-object-' + objectIndex);
		var $currentStep = $steps.filter('.demonstration-step-' + objectStep);

		var showNextStep = function() {
			$currentStep.fadeOut(400, 0, function() {
				objectStep++;
				var $nextStep = $steps.filter('.demonstration-step-' + objectStep);
				if ($nextStep.data('demonstrationDisplay')) {				
					$nextStep.css('display', $nextStep.data('demonstrationDisplay'));
					$nextStep.fadeIn()
				}
				else
					$nextStep.fadeIn();

				if ($steps.filter('.demonstration-step-' + (objectStep + 1)).length === 0) {
					console.log('Go to next index');

					/* Try to find next object index */ 
					objectIndex++;
					while (objectIndex < 100 && $('.demonstration.demonstration-object-' + objectIndex).length === 0)
						objectIndex++;

					objectStep = 0;
					/* Try to find first step to this object index */ 
					while (objectStep < 100 && $('.demonstration.demonstration-object-' + objectIndex + '.demonstration-step-' + objectStep).length === 0)
						objectStep++;
				}
			});
		}

		var $scrollTo = $currentStep.data('demonstrationScroll') ? $($currentStep.data('demonstrationScroll')) : $currentStep;
		if (! $scrollTo.isScrolledIntoView())
			$scrollTo.smoothScroll(showNextStep);
		else
			showNextStep();
	}

	$(document).keyup(function(e){
		if (e.keyCode == letterNCode)
			letterNCount += 1
		else
			letterNCount = 0;

		if (letterNCount >= needLetterNCount) {
			runDemonstration();
			letterNCount = 0;
			needLetterNCount = 1;
		}
	});
});