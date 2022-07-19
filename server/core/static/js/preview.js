window.addEventListener('load', function() {
    var one_by_one_png = (
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC'
            + '1HAwCAAAAC0lEQVR4nGNi2A8AAMgAwofTZKcAAAAASUVORK5CYII='
    );

    function hideImages(nodes) {
        for (var ii=0; ii < nodes.length; ii++) {
            var node = nodes[ii];
            if (node.tagName.toLowerCase() === 'img') {
                node.setAttribute('data-src', node.getAttribute('src'));
                node.setAttribute('src', one_by_one_png);
            }
            if (node.style.background.search(/url/) >= 0) {
                node.setAttribute('data-background', node.style.background);
                node.style.background = 'url(' + one_by_one_png + ')';
            }
        }
    }

    function showImages(nodes) {
        for (var ii=0; ii < nodes.length; ii++) {
            var node = nodes[ii];
            if (node.tagName.toLowerCase() === 'img') {
                node.setAttribute('src', node.getAttribute('data-src'));
            }
            if (node.style.background.search(/url/) >= 0) {
                node.style.background = node.getAttribute('data-background');
            }
        }
    }

    var bodyTA = document.querySelector('textarea[name=body]');
    if (bodyTA) {
        var dp = new DOMParser();
        var pp = dp.parseFromString(bodyTA.value, 'text/html');
        var nodes = pp.querySelectorAll('*');
        hideImages(nodes);

        var dd = document.createElement('iframe');
        dd.src = 'about:blank';
        dd.style['width'] = '100%';
        dd.style['border'] = '1px solid #ccc';
        dd.style['min-height'] = '480px';
        bodyTA.parentNode.appendChild(dd);
        bodyTA.style.display = 'none';
        dd.contentDocument.write(pp.documentElement.outerHTML);

        /* Add display all images link */
        var di = document.createElement('a');
        di.innerHTML = 'View Images';
        di.setAttribute('href', 'javascript:void(0)');
        di.onclick = function(ev) {
            showImages(nodes);
            dd.contentDocument.body.innerHTML = pp.documentElement.outerHTML;
            di.remove();
        };
        document.querySelector('label[for=id_body]').after(di);
    }
});
