chrome.extension.sendMessage({}, function(response) {
	let styles = `
	<style>
		.Box-row {
		    transition: filter .7s ease-in-out, opacity .7s ease-in-out;
		}

		.Box-row--muted {
			opacity: .3;
			filter: grayscale(100%)
		}

		.Box-row--muted:hover {
		    transition: filter .1s ease-in-out, opacity .1s ease-in-out;
			opacity: .5;
			filter: none
		}
	</style>`;

	let injectStyles = () => {
		if (styles) {
			let div = document.createElement('div')
			div.innerHTML = styles
			document.body.appendChild(div)

			styles = '';
		}
	}

    let path
    let fadeOutApprovedPullRequests = () => {
        Array.from(document.querySelectorAll('.Box-row')).filter((item) => 
            item.querySelectorAll('.muted-link[aria-label$=" review approvals"]').length ||
            item.querySelectorAll('.label[title$="WIP"]').length
        ).forEach((item) => {
			item.className += ' Box-row--muted';
        })
    }

    setInterval(() => {
        if (path !== location.pathname && /\/pulls$/.test(location.pathname)) {
            if (!document.querySelector('.Box-row')) {
                // pushStated to /pulls but page still loading
                return
            }

			injectStyles()
            fadeOutApprovedPullRequests()
        }

        path = location.pathname
    }, 1000)
});
