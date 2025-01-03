/**
 * jQuery Real Ajax Uploader 3.0
 * http://www.albanx.com/
 *
 * Copyright 2010-2013, Alban Xhaferllari
 *
 * Date: 03-11-2013
 */
(function() {
    var c = !1,
        g = /xyz/.test(function() {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(f) {
        function k() {
            !c && this.init && this.init.apply(this, arguments)
        }
        var r = this.prototype;
        c = !0;
        var q = new this;
        c = !1;
        for (var l in f) q[l] = "function" == typeof f[l] && "function" == typeof r[l] && g.test(f[l]) ? function(c, f) {
            return function() {
                var g = this._super;
                this._super = r[c];
                var a = f.apply(this, arguments);
                this._super = g;
                return a
            }
        }(l, f[l]) : f[l];
        k.prototype = q;
        k.prototype.constructor = k;
        k.extend = arguments.callee;
        return k
    }
})();
(function(c, g) {
    function f(a) {
        return q ? q[k[a]] || a : a
    }
    var k = {
            "Add files": 0,
            "Start upload": 1,
            "Remove all": 2,
            Close: 3,
            "Select Files": 4,
            Preview: 5,
            "Remove file": 6,
            Bytes: 7,
            KB: 8,
            MB: 9,
            GB: 10,
            "Upload aborted": 11,
            "Upload all files": 12,
            "Select Files or Drag&Drop Files": 13,
            "File uploaded 100%": 14,
            "Max files number reached": 15,
            "Extension not allowed": 16,
            "File size now allowed": 17
        },
        r = {
            it_IT: "Aggiungi file;Inizia caricamento;Rimuvi tutti;Chiudi;Seleziona;Anteprima;Rimuovi file;Bytes;KB;MB;GB;Interroto;Carica tutto;Seleziona o Trascina qui i file;File caricato 100%;Numero massimo di file superato;Estensione file non permessa;Dimensione file non permessa".split(";"),
            sq_AL: "Shto file;Fillo karikimin;Hiqi te gjith\u00eb;Mbyll;Zgjith filet;Miniatur\u00eb;Hiqe file-in;Bytes;KB;MB;GB;Karikimi u nd\u00ebrpre;Kariko t\u00eb gjith\u00eb;Zgjith ose Zvarrit dokumentat k\u00ebtu;File u karikua 100%".split(";"),
            nl_NL: "Bestanden toevoegen;Start uploaden;Verwijder alles;Sluiten;Selecteer bestanden;Voorbeeld;Verwijder bestand;Bytes;KB;MB;GB;Upload afgebroken;Upload alle bestanden;Selecteer bestanden of  Drag&Drop bestanden;Bestand ge\u00fcpload 100%".split(";"),
            de_DE: "Dateien hinzuf\u00fcgen;Hochladen;Alle entfernen;Schliessen;Dateien w\u00e4hlen;Vorschau;Datei entfernen;Bytes;KB;MB;GB;Upload abgebrochen;Alle hochgeladen;W\u00e4hlen Sie Dateien oder f\u00fcgen Sie sie mit Drag & Drop hinzu.;Upload 100%".split(";"),
            fr_FR: "Ajouter;Envoyer;Tout supprimer;Fermer;Parcourir;Visualiser;Supprimer fichier;Bytes;Ko;Mo;Go;Envoi annul\u00e9;Tout envoyer;Parcourir ou Glisser/D\u00e9poser;Fichier envoy\u00e9 100%".split(";")
        },
        q = {},
        l = Class.extend({
            init: function(a, b, e, d, c) {
                this.file = a;
                this.status = 0;
                this.name = b;
                this.size = e;
                this.info = this.xhr = null;
                this.ext = d;
                this.pos = c.files.length;
                this.AU = c;
                this.settings = c.settings;
                this.exifData = null;
                this.currentByte = 0;
                this.afterInit()
            },
            afterInit: function() {
                this.renderHtml();
                this.bindEvents();
                this.doPreview();
                this.settings.hideUploadForm && null !== this.AU.form && this.AU.form !== g && this.uploadButton.hide();
                var a = this.AU;
                if (a.hasHtml4) {
                    var a = a.getParams(this.name, 0, !1),
                        b = c('<form action="' + this.settings.url + '" method="post" target="ax-main-frame" encType="multipart/form-data" />').hide().appendTo(this.li);
                    b.append(this.file);
                    b.append('<input type="hidden" value="' + this.name + '" name="ax-file-name" />');
                    for (var e = 0; e < a.length; e++) {
                        var d = a[e].split("=");
                        b.append('<input type="hidden" value="' +
                            d[1] + '" name="' + d[0] + '" />')
                    }
                    this.xhr = b;
                }
            },
            renderHtml: function() {
                var a = this.settings,
                    b = this.AU.formatSize(this.size);
                this.li = c("<li />").appendTo(this.AU.fileList).attr("title", name);
                a.bootstrap && (this.li = c("<a />").appendTo(this.li));
                this.prevContainer = c('<a class="ax-prev-container" />').appendTo(this.li);
                this.details = c('<div class="ax-details" />').appendTo(this.li);
                this.progressInfo = c('<div class="ax-progress" />').appendTo(this.li);
                this.buttons = c('<div class="ax-toolbar" />').appendTo(this.li);
                this.prevImage = c('<img class="ax-preview img-responsive img-thumbnail img-rounded" src="" alt="' + f("Preview") + '" />').appendTo(this.prevContainer);
                this.nameContainer = c('<div class="ax-file-name">' + this.name + "</div>").appendTo(this.details);
                this.sizeContainer = c('<div class="ax-file-size">' + b + "</div>").appendTo(this.details);
                this.progressBar = c('<div class="ax-progress-bar" />').appendTo(this.progressInfo);
                this.progressPer = c('<div class="ax-progress-info">0%</div>').appendTo(this.progressInfo);
                this.uploadButton = c('<a title="' + f("Start upload") +
                    '" class="ax-upload ax-button btn blue start" />').appendTo(this.buttons).append('<i class="fa fa-upload"></i>');
                this.removeButton = c('<a title="Remove file" class="ax-remove ax-button btn red delete" />').appendTo(this.buttons).append('<i class="fa fa-trash"></i>');
                a.bootstrap && (this.li.addClass("media thumbnail label-info"), this.prevContainer.addClass("pull-left"), this.prevImage.addClass("img-rounded media-object"), this.details.addClass("label label-info").css({
                        "border-bottom-left-radius": 0
                    }),
                    this.progressInfo.addClass("progress progress-striped active").css({
                        "margin-bottom": 0
                    }), this.progressBar.addClass("bar"), this.buttons.css({
                        "border-top-left-radius": 0,
                        "border-top-right-radius": 0
                    }), this.uploadButton.addClass("btn btn-success btn-small").find("span").addClass("icon-play"), this.removeButton.addClass("btn btn-danger btn-small").find("span").addClass("icon-minus-sign"))
            },
            bindEvents: function() {
                this.uploadButton.bind("click", this, function(a) {
                    a.data.AU.settings.enable && (2 != a.data.status ? a.data.startUpload() :
                        a.data.stopUpload())
                });
                this.removeButton.bind("click", this, function(a) {
                    a.data.AU.settings.enable && a.data.AU.removeFile(a.data.pos)
                });
                this.settings.editFilename && this.nameContainer.bind("dblclick", this, function(a) {
                    if (a.data.AU.settings.enable) {
                        a.stopPropagation();
                        var b = a.data.ext;
                        a = a.data.name.replace("." + b, "");
                        c(this).html('<input type="text" value="' + a + '" />.' + b)
                    }
                }).bind("blur focusout", this, function(a) {
                    a.stopPropagation();
                    var b = c(this).children("input").val();
                    "undefined" != typeof b && (b = b.replace(/[|&;$%@"<>()+,]/g,
                        "") + "." + a.data.ext, c(this).html(b), a.data.name = b, a.data.AU.hasAjaxUpload || a.data.xhr.children('input[name="ax-file-name"]').val(b))
                })
            },
            doPreview: function() {
                if (this.AU.settings.previews && this.AU.hasAjaxUpload && this.file.type.match(/image.*/) && ("jpg" == this.ext || "gif" == this.ext || "png" == this.ext) && "undefined" !== typeof FileReader) {
                    var a = this.name,
                        b = this;
                    this.prevContainer.css("background", "none");
                    var e = this.prevImage,
                        d = new FileReader;
                    d.onload = function(d) {
                        e.css("cursor", "pointer").attr("src", d.target.result).click(function() {
                            var e =
                                new Image;
                            e.onload = function() {
                                var e = Math.min(c(window).width() / this.width, (c(window).height() - 100) / this.height),
                                    h = 1 > e ? this.width * e : this.width,
                                    e = 1 > e ? this.height * e : this.height,
                                    f = c(window).scrollTop() - 20 + (c(window).height() - e) / 2,
                                    g = (c(window).width() - h) / 2,
                                    f = c("#ax-box").css({
                                        top: f,
                                        height: e,
                                        width: h,
                                        left: g
                                    });
                                f.children("img").attr({
                                    width: h,
                                    height: e,
                                    src: d.target.result
                                });
                                c("#ax-box-fn").find("span").html(a + " (" + b.AU.formatSize(b.size) + ")");
                                f.fadeIn(500);
                                c("#ax-box-shadow").css("height", c(document).height()).show()
                            };
                            e.src = d.target.result;
                            c("#ax-box-shadow").css("z-index", 1E4);
                            c("#ax-box").css("z-index", 10001)
                        })
                    };
                    d.readAsDataURL(this.file)
                } else this.prevContainer.addClass("ax-filetype-" + this.ext).children("img:first").remove()
            },
            askUser: function(a, b) {
                this.askDiv && this.askDiv.remove();
                this.askDiv = c('<div class="ax-ask-div"></div>').appendTo(this.li);
                var e = c('<div class="ax-ask-inner"><div class="ax-ask-quest">' + b + "</div> </div>").appendTo(this.askDiv),
                    d = c('<a title="Yes" class="ax-button ax-ask-yes"><span class="ax-upload-icon ax-icon"></span> <span>Yes</span></a>').appendTo(e),
                    e = c('<a title="No" class="ax-button ax-ask-no"><span class="ax-clear-icon ax-icon"></span> <span>No</span></a>').appendTo(e);
                this.settings.bootstrap && (this.askDiv.addClass("alert"), d.addClass("btn btn-success btn-small").find(".ax-icon").addClass("icon-ok"), e.addClass("btn btn-danger btn-small").find(".ax-icon").addClass("icon-remove"));
                d.on("click", this, function(b) {
                    a.call(b.data);
                    b.data.askDiv.remove();
                    b.data.askDiv = null
                });
                e.on("click", this, function(a) {
                    a.data.askDiv.remove();
                    a.data.askDiv = null
                })
            },
            checkFileExists: function(a) {
                a.call(this)
            },
            startUpload: function() {
                var a = this.settings.beforeUpload.call(this, this.name, this.file);
                a ? (this.status = 3, this.checkFileExists(function() {
                    this.progressBar.css("width", "0%");
                    this.progressPer.html("0%");
                    this.uploadButton.addClass("ax-abort");
                    this.status = 2;
                    this.AU.hasAjaxUpload ? this.uploadAjax() : this.AU.hasFlash ? this.AU.uploading || (this.AU.uploading = !0, this.AU.flashObj.uploadFile(this.pos)) : this.uploadStandard()
                })) : (this.status = -1, this.onError("File validation failed"));
                return a
            },
            uploadAjax: function() {
                var a = this.settings,
                    b = this.file,
                    e = this.currentByte,
                    d = this.name,
                    c = this.size,
                    h = a.chunkSize,
                    f = h + e,
                    g = 0 >= c - f,
                    m = b,
                    l = 0 != h ? f / h : 1;
                this.xhr = new XMLHttpRequest;
                0 == h ? (m = b, g = !0) : b.slice ? m = b.slice(e, f) : b.mozSlice ? m = b.mozSlice(e, f) : b.webkitSlice ? m = b.webkitSlice(e, f) : (m = b, g = !0);
                var n = this;
                this.xhr.upload.addEventListener("abort", function(a) {
                    n.AU.slots--
                }, !1);
                this.xhr.upload.addEventListener("progress", function(a) {
                    a.lengthComputable && (a = Math.round(100 * (a.loaded + l * h - h) / c), n.onProgress(a))
                }, !1);
                this.xhr.upload.addEventListener("error", function(a) {
                    n.onError(this.responseText)
                }, !1);
                this.xhr.onreadystatechange = function() {
                    if (4 == this.readyState && 200 == this.status) try {
                        var a = JSON.parse(this.responseText);
                        0 == e && (n.name = a.name, n.nameContainer.html(a.name));
                        if (-1 == parseInt(a.status)) throw a.info;
                        if (g) n.onFinishUpload(a.name, a.size, a.status, a.info);
                        else n.currentByte = f, n.uploadAjax()
                    } catch (b) {
                        n.onError(b)
                    }
                };
                b = this.AU.getParams(d, c, !this.AU.useFormData);
                b.push("ax-start-byte=" + e);
                b.push("ax-last-chunk=" +
                    g);
                if (this.AU.useFormData) {
                    d = new FormData;
                    d.append("ax_file_input", m);
                    for (m = 0; m < b.length; m++) {
                        var k = b[m].split("=");
                        d.append(k[0], k[1])
                    }
                    this.xhr.open("POST", a.url, a.async);
                    this.xhr.send(d)
                } else d = -1 == a.url.indexOf("?") ? "?" : "&", this.xhr.open("POST", a.url + d + b.join("&"), a.async), this.xhr.setRequestHeader("Cache-Control", "no-cache"), this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xhr.setRequestHeader("Content-Type", "application/octet-stream"), this.xhr.send(m)
            },
            uploadStandard: function() {
                this.progressBar.css("width",
                    "50%");
                this.progressPer.html("50%");
                c("#ax-main-frame").unbind("load").bind("load", this, function(a) {
                    var b = null;
                    this.contentDocument ? b = this.contentDocument : this.contentWindow && (b = this.contentWindow.document);
                    try {
                        var e = c.parseJSON(b.body.innerHTML);
                        a.data.onProgress(100);
                        a.data.onFinishUpload(e.name, e.size, e.status, e.info)
                    } catch (d) {
                        a.data.onError(b.body.innerHTML)
                    }
                    a.data.AU.upload_all && a.data.AU.files[a.data.pos + 1] !== g && a.data.AU.files[a.data.pos + 1].startUpload()
                });
                this.xhr.submit()
            },
            stopUpload: function() {
                if (this.AU.hasAjaxUpload) null !==
                    this.xhr && (this.xhr.abort(), this.xhr = null);
                else if (this.AU.hasFlash) this.AU.flashObj.stopUpload(this.pos);
                else {
                    var a = document.getElementById("ax-main-frame");
                    try {
                        a.contentWindow.document.execCommand("Stop")
                    } catch (b) {
                        a.contentWindow.stop()
                    }
                }
                this.uploadButton.removeClass("ax-abort");
                this.status = this.currentByte = 0;
                this.progressBar.css("width", 0);
                this.progressPer.html(f("Upload aborted"))
            },
            onError: function(a) {
                this.AU.slots--;
                this.currentByte = 0;
                this.status = -1;
                this.info = a;
                this.progressPer.html(a);
                this.progressBar.css("width",
                    "0%");
                this.uploadButton.removeClass("ax-abort");
                this.settings.error.call(this, a, this.name);
                this.settings.removeOnError && this.AU.removeFile(this.pos)
            },
            onFinishUpload: function(a, b, e, d) {
                this.AU.slots--;
                this.name = a;
                this.status = parseInt(e);
                this.info = d;
                this.AU.hasAjaxUpload || this.AU.hasFlash || (b = this.AU.formatSize(this.size), this.sizeContainer.html(b));
                this.currentByte = 0;
                this.nameContainer.html(a);
                this.li.attr("title", a);
                this.onProgress(100);
                this.uploadButton.removeClass("ax-abort");
                this.progressBar.width(0);
                this.progressPer.html(f("File uploaded 100%"));
                this.settings.success.call(this, a);
                a = !0;
                for (b = 0; b < this.AU.files.length; b++) 1 != this.AU.files[b].status && -1 != this.AU.files[b].status && (a = !1);
                this.AU.upload_all && this.AU.uploadAll();
                a && this.AU.finish();
                this.settings.removeOnSuccess && this.AU.removeFile(this.pos)
            },
            onProgress: function(a) {
                this.progressBar.css("width", a + "%");
                this.progressPer.html(a + "%")
            }
        }),
        t = function(a, b) {
            this.useFormData = this.hasAjaxUpload = this.hasFlash = !1;
            this.hasHtml4 = !0;
            this.settings = this.preCheckSettings(b);
            this._init(a);
            this.checkUploadSupport();
            this.container = a;
            this.files = [];
            this.slots = 0;
            this.flashObj = this.form_submit_event = this.form = null;
            this.uploading = this.upload_all = !1;
            this.renderHtml();
            b.onInit.call(this);
            this.bindEvents()
        };
    t.prototype = {
        preCheckSettings: function(a) {
            a.allowDelete = a.allowDelete || !1;
            a.checkFileExists = a.checkFileExists || !1;
            "auto" == a.language && (a.language = (window.navigator.userLanguage || window.navigator.language).replace("-", "_"));
            a.allowExt = c.map(a.allowExt, function(a, e) {
                return a.toLowerCase()
            });
            return a
        },
        _init: function(a) {
            var b = this.settings;
            q = r[b.language];
            a.addClass("ax-uploader").data("author", "http://www.albanx.com/");
            0 == c("#ax-main-frame").length && c('<iframe name="ax-main-frame" id="ax-main-frame" />').hide().appendTo("body");
            0 == c("#ax-box").length && c('<div id="ax-box"><div id="ax-box-fn"><span></span></div><img /><a id="ax-box-close" title="' + f("Close") + '"></a></div>').appendTo("body");
            0 == c("#ax-box-shadow").length && c('<div id="ax-box-shadow"/>').appendTo("body");
            c("#ax-box-close, #ax-box-shadow").click(function(a) {
                a.preventDefault();
                c("#ax-box").fadeOut(500);
                c("#ax-box-shadow").hide()
            });
            b.bootstrap && c("#ax-box-close").addClass("btn btn-danger").html('<span class="ax-clear-icon ax-icon icon-remove-sign"></span>');
            for (b = "AX_" + Math.floor(100001 * Math.random()); 0 < c("#" + b).length;) b = "AX_" + Math.floor(100001 * Math.random());
            a.attr("id", a.attr("id") ? a.attr("id") : b)
        },
        checkUploadSupport: function() {
            var a = document.createElement("input");
            a.type = "file";
            this.hasAjaxUpload = "multiple" in a && "undefined" != typeof File && "undefined" != typeof(new XMLHttpRequest).upload;
            this.hasFlash = !1;
            /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) && /Version\/5\./.test(navigator.userAgent) && /Win/.test(navigator.platform) && (this.hasAjaxUpload = !1);
            this.hasHtml4 = !this.hasFlash && !this.hasAjaxUpload;
            this.useFormData = window.FormData !== g;
            a = navigator.userAgent.match(/Firefox\/(\d+)?/);
            null !== a && 6 >= (null === a || a[1] === g || isNaN(a[1]) ? 7 : parseFloat(a[1])) && (this.useFormData = !1);
            null !== navigator.userAgent.match(/Opera\/(\d+)?/) && (a = navigator.userAgent.match(/Version\/(\d+)?/),
                12.1 > (a[1] === g || isNaN(a[1]) ? 0 : parseFloat(a[1])) && (this.useFormData = !1))
        },
        renderHtml: function() {
            var a = this.settings;
            this.mainWrapper = c('<div class="ax-main-container" />').append('<h5 class="ax-main-title">' + f("Select Files") + "</h5>").appendTo(this.container);
            this.max_size = a.maxFileSize;
            var b = a.maxFileSize.slice(-1);
            if (isNaN(b)) switch (this.max_size = this.max_size.replace(b, ""), b) {
                case "P":
                    this.max_size *= 1024;
                case "T":
                    this.max_size *= 1024;
                case "G":
                    this.max_size *= 1024;
                case "M":
                    this.max_size *= 1024;
                case "K":
                    this.max_size *=
                        1024 /*ax-button*/
            }
            var e = " ax-button btn green",
                b = "ax-upload-all ax-button btn blue start",
                d = "ax-clear ax-button btn red delete",
                g = "fa fa-plus",
                h = "fa fa-upload",
                p = "fa fa-trash";
            a.bootstrap && (e += " btn btn-primary", b += " btn btn-success", d += " btn btn-danger", g += " icon-plus-sign", h += " icon-play", p += " fa fa-trash");
            this.browse_c = c('<a class="' + e + '" title="' + f("Add files") + '" />').append('<i class="' + g + '"></i> ' + f("Add files") + ' <span class="ax-text">' + f("Add files") + "</span>").appendTo(this.mainWrapper);
            this.browseFiles = c('<input type="file" class="ax-browse" name="ax_file_input" />').attr("multiple",
                this.hasAjaxUpload).appendTo(this.browse_c);
            a.uploadDir && this.browseFiles.attr({
                directory: "directory",
                webkitdirectory: "webkitdirectory",
                mozdirectory: "mozdirectory"
            });
            this.hasFlash && (this.browse_c.children(".ax-browse").remove(), e = this.container.attr("id") + "_flash", g = '\x3c!--[if !IE]> --\x3e<object style="position:absolute;width:150px;height:100px;left:0px;top:0px;z-index:1000;" id="' + e + '" type="application/x-shockwave-flash" data="' + a.flash + '" width="150" height="100">\x3c!-- <![endif]--\x3e\x3c!--[if IE]><object style="position:absolute;width:150px;height:100px;left:0px;top:0px;z-index:1000;" id="' +
                e + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="150" height="100"><param name="movie" value="' + a.flash + '" />\x3c!--\x3e\x3c!--dgx--\x3e<param name="flashvars" value="instance_id=' + this.container.attr("id") + '"><param name="allowScriptAccess" value="always" /><param value="transparent" name="wmode"></object>\x3c!-- <![endif]--\x3e', this.browse_c.append('<div style="position:absolute;overflow:hidden;width:150px;height:100px;left:0px;top:0px;z-index:0;">' +
                    g + "</div>"), this.flashObj = document.getElementById(e));
            this.uploadFiles = c('<a class="' + b + '" title="' + f("Upload all files") + '" />').append('<i class="' + h + '"></i> ' + f("Upload all files") + ' <span class="ax-text">' + f("Start upload") + "</span>").appendTo(this.mainWrapper);
            this.removeFiles = c('<a class="' + d + '" title="' + f("Remove all") + '" />').append('<i class="' + p + '"></i> ' + f("Remove all") + ' <span class="ax-text">' + f("Remove all") + "</span>").appendTo(this.mainWrapper);
            this.fileList = c('<ul class="ax-file-list" />').appendTo(this.mainWrapper);
            a.bootstrap && this.fileList.addClass("media-list")
        },
        bindEvents: function() {
            var a = this.settings;
            this.browseFiles.bind("change", this, function(a) {
                a = a.data;
                a.settings.enable && !a.hasFlash && (a.addFiles(a.hasAjaxUpload ? this.files : Array(this)), a.hasAjaxUpload ? this.value = "" : c(this).clone(!0).val("").appendTo(a.browse_c))
            });
            this.uploadFiles.bind("click", this, function(a) {
                a.data.settings.enable && a.data.uploadAll();
                return !1
            });
            this.removeFiles.bind("click", this, function(a) {
                a.data.settings.enable && a.data.clearQueue();
                return !1
            });
            0 < c(a.form).length ? this.form = c(a.form) : "parent" == a.form && (this.form = this.container.parents("form:first"));
            if (null !== this.form && this.form !== g) {
                a.hideUploadForm && this.uploadFiles.hide();
                var b = this.form.data("events");
                null !== b && b !== g && null !== b.submit && b.submit !== g && (this.form_submit_event = b.submit);
                this.form.unbind("submit");
                this.form.bind("submit.ax", this, function(a) {
                    if (0 < a.data.files.length) return a.data.uploadAll(), !1
                })
            }
            if (this.hasAjaxUpload) {
                var b = "self" == a.dropArea ? this.container[0] :
                    c(a.dropArea)[0],
                    e = this;
                "self" == a.dropArea && this.mainWrapper.find(".ax-main-title").html(f("Select Files or Drag&Drop Files"));
                b.addEventListener("dragenter", function(a) {
                    a.stopPropagation();
                    a.preventDefault()
                }, !1);
                b.addEventListener("dragover", function(b) {
                    b.stopPropagation();
                    b.preventDefault();
                    e.settings.enable && (a.dropClass ? c(this).addClass(a.dropClass) : this.style.backgroundColor = a.dropColor)
                }, !1);
                b.addEventListener("dragleave", function(b) {
                    b.stopPropagation();
                    b.preventDefault();
                    e.settings.enable &&
                        (a.dropClass ? c(this).removeClass(a.dropClass) : this.style.backgroundColor = "")
                }, !1);
                b.addEventListener("drop", function(b) {
                    e.settings.enable && (b.stopPropagation(), b.preventDefault(), e.addFiles(b.dataTransfer.files), this.style.backgroundColor = "", a.autoStart && e.uploadAll())
                }, !1);
                c(document).unbind(".ax").bind("keyup.ax", function(a) {
                    27 == a.keyCode && c("#ax-box-shadow, #ax-box").fadeOut(500)
                })
            }
            this.enable(this.settings.enable)
        },
        finish: function() {
            this.upload_all = !1;
            for (var a = [], b = 0; b < this.files.length; b++) a.push(this.files[b].name);
            this.settings.finish.call(this, a, this.files);
            this.settings.beforeSubmit.call(this, a, this.files, function() {
                if (null !== this.form && this.form !== g) {
                    for (var b = "function" == typeof this.settings.remotePath ? this.settings.remotePath() : this.settings.remotePath, c = 0; c < a.length; c++) this.form.append('<input name="ax-uploaded-files[]" type="hidden" value="' + (b + a[c]) + '" />');
                    this.form.unbind("submit.ax");
                    null !== this.form_submit_event && this.form_submit_event !== g && this.form.bind("submit", this.form_submit_event);
                    b = this.form.find('[type="submit"]');
                    0 < b.length ? b.trigger("click") : this.form.submit()
                }
            })
        },
        addFiles: function(a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d, f, h;
                this.hasAjaxUpload || this.hasFlash ? (f = a[c].name, h = a[c].size) : (f = a[c].value.replace(/^.*\\/, ""), h = 0);
                d = f.split(".").pop().toLowerCase();
                var g = this.checkFile(f, h);
                "" == g ? (d = new l(a[c], f, h, d, this), this.files.push(d), b.push(d)) : this.settings.error.call(this, g, f)
            }
            this.settings.onSelect.call(this, b);
            this.settings.autoStart && this.uploadAll()
        },
        checkFile: function(a, b) {
            var e = a.split(".").pop().toLowerCase(),
                d = !!(this.files.length < this.settings.maxFiles),
                l = !!(0 <= c.inArray(e, this.settings.allowExt) || 0 == this.settings.allowExt.length),
                h = !!(b <= this.max_size),
                p = "function" === typeof this.settings.validateFile ? this.settings.validateFile.call(this, a, e, b) : "",
                k = "";
            d || (k = k + f("Max files number reached") + ":" + d + "\n");
            l || (k = k + f("Extension not allowed") + ":" + e + "\n");
            h || (k = k + f("File size now allowed") + ":" + b + "\n");
            "" != p && p !== g && null !== p && (k += p);
            return k
        },
        getPendingFiles: function() {
            for (var a = [], b = 0; b < this.files.length; b++) 0 ==
                this.files[b].status && this.slots <= this.settings.maxConnections && (a.push(this.files[b]), this.slots++);
            return a
        },
        uploadAll: function() {
            this.upload_all = !0;
            if (!1 !== this.settings.beforeUploadAll.call(this, this.files))
                for (var a = this.getPendingFiles(), b = 0; b < a.length; b++) a[b].startUpload()
        },
        clearQueue: function() {
            for (; 0 < this.files.length;) this.removeFile(0)
        },
        getParams: function(a, b, c) {
            var d = this.settings,
                f = "function" == typeof d.remotePath ? d.remotePath() : d.remotePath,
                h = [];
            h.push("ax-file-path=" + (c ? encodeURIComponent(f) :
                f));
            h.push("ax-allow-ext=" + (c ? encodeURIComponent(d.allowExt.join("|")) : d.allowExt.join("|")));
            h.push("ax-file-name=" + (c ? encodeURIComponent(a) : a));
            h.push("ax-max-file-size=" + d.maxFileSize);
            h.push("ax-file-size=" + b);
            h.push("ax-thumbPostfix=" + (c ? encodeURIComponent(d.thumbPostfix) : d.thumbPostfix));
            h.push("ax-thumbPath=" + (c ? encodeURIComponent(d.thumbPath) : d.thumbPath));
            h.push("ax-thumbFormat=" + (c ? encodeURIComponent(d.thumbFormat) : d.thumbFormat));
            h.push("ax-thumbHeight=" + d.thumbHeight);
            h.push("ax-thumbWidth=" +
                d.thumbWidth);
            h.push("ax-random=" + 10001 * Math.random());
            (this.settings.checkFileExists || this.settings.overrideFile) && h.push("ax-override=1");
            a = "function" == typeof d.data ? d.data() : d.data;
            if ("object" == typeof a)
                for (var g in a) h.push(g + "=" + (c ? encodeURIComponent(a[g]) : a[g]));
            else if ("string" == typeof a && "" != a)
                for (c = a.split("&"), g = 0; g < c.length; g++) h.push(c[g]);
            return h
        },
        removeFile: function(a) {
            var b = this.files[a];
            b.stopUpload();
            b.li.remove();
            b.file = null;
            this.files.splice(a, 1);
            this.hasFlash && this.flashObj.removeFile(a);
            for (a = 0; a < this.files.length; a++) this.files[a].pos = a
        },
        stopUpload: function() {
            for (var a = 0; a < this.files.lenght; a++) this.files[a].stopUpload()
        },
        formatSize: function(a) {
            var b = this.settings.precision;
            "undefined" == typeof b && (b = 2);
            for (var c = [f("Bytes"), f("KB"), f("MB"), f("GB")], d = 0; 1024 <= a && d < c.length - 1;) a /= 1024, d++;
            var g = Math.round(a),
                b = Math.pow(10, b);
            a = Math.round(a * b % b);
            return g + "." + a + " " + c[d]
        },
        options: function(a, b) {
            if (b !== g && null !== b) this.settings[a] = b, "enable" == a && this.enable(b);
            else return this.settings[a]
        },
        enable: function(a) {
            (this.settings.enable = a) ? this.container.removeClass("ax-disabled").find("input").attr("disabled", !1): this.container.addClass("ax-disabled").find("input").attr("disabled", !0)
        }
    };
    var u = {
            remotePath: "uploads/",
            url: "upload.php",
            flash: "uploader.swf",
            data: "",
            async: !0,
            maxFiles: 9999,
            allowExt: [],
            success: function(a) {},
            finish: function(a, b) {},
            error: function(a, b) {},
            enable: !0,
            chunkSize: 1048576,
            maxConnections: 3,
            dropColor: "red",
            dropClass: "ax-drop",
            dropArea: "self",
            autoStart: !1,
            thumbHeight: 0,
            thumbWidth: 0,
            thumbPostfix: "_thumb",
            thumbPath: "",
            thumbFormat: "",
            maxFileSize: "10M",
            form: null,
            hideUploadForm: !0,
            beforeSubmit: function(a, b, c) {
                c.call(this)
            },
            editFilename: !1,
            beforeUpload: function(a, b) {
                return !0
            },
            beforeUploadAll: function(a) {
                return !0
            },
            onSelect: function(a) {},
            onInit: function(a) {},
            language: "auto",
            uploadDir: !1,
            removeOnSuccess: !1,
            removeOnError: !1,
            bootstrap: !1,
            previews: !0,
            validateFile: function(a, b, c) {},
            overrideFile: !1,
            checkFileExists: !1,
            fileInfo: function(a) {
                var b = "",
                    c;
                for (c in a) a.hasOwnProperty(c) && (b = "object" ==
                    typeof a[c] ? b + (c + " : [" + a[c].length + " values]\r\n") : b + (c + " : " + a[c] + "\r\n"));
                alert(b)
            },
            allowDelete: !1
        },
        s = {
            init: function(a) {
                return this.each(function() {
                    var b = c.extend({}, u, a),
                        e = c(this).html(""),
                        d = e.data("AU");
                    d !== g && null !== d || e.data("AU", new t(e, b))
                })
            },
            clear: function() {
                return this.each(function() {
                    c(this).data("AU").clearQueue()
                })
            },
            start: function() {
                return this.each(function() {
                    c(this).data("AU").uploadAll()
                })
            },
            addFlash: function(a) {
                c(this).data("AU").addFiles(a)
            },
            progressFlash: function(a, b) {
                c(this).data("AU").files[b].onProgress(a)
            },
            onFinishFlash: function(a, b) {
                var e = c(this).data("AU");
                e.uploading = !1;
                try {
                    var d = jQuery.parseJSON(a);
                    if (-1 == parseInt(d.status)) throw d.info;
                    e.files[b].onFinishUpload(d.name, d.size, d.status, d.info)
                } catch (f) {
                    e.files[b].onError(f)
                }
            },
            getUrl: function(a, b) {
                return c(this).data("AU").settings.url
            },
            getParams: function(a, b) {
                return c(this).data("AU").getParams(a, b, !0).join("&")
            },
            getAllowedExt: function(a) {
                var b = c(this).data("AU").settings.allowExt;
                return !0 === a ? b : b.join("|")
            },
            getMaxFileNum: function(a) {
                return c(this).data("AU").settings.maxFiles
            },
            checkFile: function(a, b) {
                return "" == c(this).data("AU").checkFile(a, b)
            },
            checkEnable: function() {
                return c(this).data("AU").settings.enable
            },
            getFiles: function() {
                return c(this).data("AU").files
            },
            enable: function() {
                return this.each(function() {
                    c(this).data("AU").enable(!0)
                })
            },
            disable: function() {
                return this.each(function() {
                    c(this).data("AU").enable(!1)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var a = c(this);
                    a.data("AU").clearQueue();
                    a.removeData("AU").html("")
                })
            },
            option: function(a, b) {
                return this.each(function() {
                    return c(this).data("AU").options(a,
                        b)
                })
            },
            debug: function(a) {}
        };
    c.fn.ajaxupload = function(a, b) {
        if (s[a]) return s[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof a && a) c.error("Method " + a + " does not exist on jQuery.AjaxUploader");
        else return s.init.apply(this, arguments)
    }
})(jQuery);