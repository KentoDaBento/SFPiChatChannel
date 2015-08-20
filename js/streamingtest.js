// We make use of this 'server' variable to provide the address of the
// REST Janus API. By default, in this example we assume that Janus is
// co-located with the web server hosting the HTML pages but listening
// on a different port (8088, the default for HTTP in Janus), which is
// why we make use of the 'window.location.hostname' base address. Since
// Janus can also do HTTPS, and considering we don't really want to make
// use of HTTP for Janus if your demos are served on HTTPS, we also rely
// on the 'window.location.protocol' prefix to build the variable, in
// particular to also change the port used to contact Janus (8088 for
// HTTP and 8089 for HTTPS, if enabled).
// In case you place Janus behind an Apache frontend (as we did on the
// online demos at http://janus.conf.meetecho.com) you can just use a
// relative path for the variable, e.g.:
//
// 		var server = "/janus";
//
// which will take care of this on its own.
//
//
// If you want to use the WebSockets frontend to Janus, instead, you'll
// have to pass a different kind of address, e.g.:
//
// 		var server = "ws://" + window.location.hostname + ":8188";
//
// Of course this assumes that support for WebSockets has been built in
// when compiling the gateway. WebSockets support has not been tested
// as much as the REST API, so handle with care!
//
//
// If you have multiple options available, and want to let the library
// autodetect the best way to contact your gateway (or pool of gateways),
// you can also pass an array of servers, e.g., to provide alternative
// means of access (e.g., try WebSockets first and, if that fails, fall
// back to plain HTTP) or just have failover servers:
//
//		var server = [
//			"ws://" + window.location.hostname + ":8188",
//			"/janus"
//		];
//
// This will tell the library to try connecting to each of the servers
// in the presented order. The first working server will be used for
// the whole session.
//
var server = null;
// if(window.location.protocol === 'http:')
	server = "http://54.148.218.94:8088/janus";
// else
// 	server = "https://" + window.location.hostname + ":8089/janus";

var janus = null;
var streaming = null;
var started = false;
var spinner = null;

var selectedStream = null;


$(document).ready(function() {
	// Initialize the library (console debug enabled)
	Janus.init({debug: true, callback: function() {
			// Create session
			janus = new Janus(
				{
					server: server,
					success: function() {
						console.log('working?');
						// Attach to streaming plugin
						janus.attach(
							{
								plugin: "janus.plugin.streaming",
								success: function(pluginHandle) {
									$('#details').remove();
									streaming = pluginHandle;
									console.log("Plugin attached! (" + streaming.getPlugin() + ", id=" + streaming.getId() + ")");
									// Setup streaming session
									// $('#start').removeAttr('disabled').html("Stop")
									// 	.click(function() {
									// 		$(this).attr('disabled', true);
									// 		janus.destroy();
									// 		$('#streamslist').attr('disabled', true);
									// 		$('#watch').attr('disabled', true).unbind('click');
									// 		$('#start').attr('disabled', true).html("Bye").unbind('click');
									// 	});
								},
								error: function(error) {
									console.log("  -- Error attaching plugin... " + error);
									bootbox.alert("Error attaching plugin... " + error);
								},
								onmessage: function(msg, jsep) {
									console.log(" ::: Got a message :::");
									console.log(JSON.stringify(msg));
									var result = msg["result"];
									if(result !== null && result !== undefined) {
										if(result["status"] !== undefined && result["status"] !== null) {
											var status = result["status"];
											if(status === 'starting')
												$('#status').removeClass('hide').text("Starting, please wait...").show();
											else if(status === 'started')
												$('#status').removeClass('hide').text("Started").show();
											else if(status === 'stopped')
												stopStream();
										}
									}
									if(jsep !== undefined && jsep !== null) {
										console.log("Handling SDP as well...");
										console.log(jsep);
										// Answer
										streaming.createAnswer(
											{
												jsep: jsep,
												media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
												success: function(jsep) {
													console.log("Got SDP!");
													console.log(jsep);
													var body = { "request": "start" };
													streaming.send({"message": body, "jsep": jsep});
													$('#watch').html("Stop").removeAttr('disabled').click(stopStream);
												},
												error: function(error) {
													console.log("WebRTC error:");
													console.log(error);
													bootbox.alert("WebRTC error... " + JSON.stringify(error));
												}
											});
									}
								},
								onremotestream: function(stream) {
									console.log(" ::: Got a remote stream :::");
									console.log(JSON.stringify(stream));
									if($('#remotevideo').length === 0)
										$('#stream').append('<video class="rounded centered hide" id="remotevideo" width=320 height=240 autoplay/>');
									// Show the stream and hide the spinner when we get a playing event
									$("#remotevideo").bind("playing", function () {
										$('#waitingvideo').remove();
										$('#remotevideo').removeClass('hide');
										if(spinner !== null && spinner !== undefined)
											spinner.stop();
										spinner = null;
									});
									attachMediaStream($('#remotevideo').get(0), stream);
								},
								oncleanup: function() {
									console.log(" ::: Got a cleanup notification :::");
									$('#remotevideo').remove();
								}
							});
					},
					error: function(error) {
						console.log(error);
						console.log('Nope');
						bootbox.alert(error, function() {
							window.location.reload();
						});
					},
					destroyed: function() {
						console.log('ded');
						window.location.reload();
					}
				});
	}});
});

function startStream() {
	var selectedStream = '3';
	console.log("Selected video id #" + selectedStream);
	if(selectedStream === undefined || selectedStream === null) {
		bootbox.alert("Select a stream from the list");
		return;
	}
	$('#streamset').attr('disabled', true);
	$('#streamslist').attr('disabled', true);
	$('#watch').attr('disabled', true).unbind('click');
	var body = { "request": "watch", id: parseInt(selectedStream) };
	// streaming.send({"message": body});
	// No remote video yet
	$('#s6').append('<video id="s7"/>');
	if(spinner == null) {
		var target = document.getElementById('stream');
		spinner = new Spinner({top:100}).spin(target);
	} else {
		spinner.spin();
	}
}