/* global $ */
/* golobal dsm_Grid, dsm_BoxVisible */
function dsm_Player(){
	
var dsm_Rangeslider = $('#dsmSliderTrack[type=range]');
var dsm_Track_Time = $('#trackTime');
var dsm_Track_Name = $('#trackName');
var dsm_Track_Number = $('#trackNumber');
var dsm_Track_Duration = $('#trackDuration');
var dsm_Cover_Art = $('#dsmCoverArt');

// AUDIO //
var dsm_Audio;

// FOR FAST FORWARD //
var dsm_Fast_Playback
var	dsm_TimeOut
// CURRENT AUDIO URL //
var dsm_Track;

// SOUND VOLUME /
var dsm_Volume;

// SCREEN CHANGE //
var dsm_Screen;
var dsm_small, dsm_medium, dsm_large;
// DISPLAY TEXT ANIMATION //
var dsm_Text_Width;
var dsm_Text_Time_Animate;

// BOOLEAN //
var dsm_Load_Track;
var dsm_Play_Status;
var dsm_Stop_Status;
var dsm_Repeat_Status;
var dsm_toggleStatus;

// DEVELOPMENT MOD //
var dsm_devMod;
// DIVs ID//
var elem1, elem2, elem3;

var dsmObj = {
	// CONFIGURATION FUNCTION //
	grid : function(){
		switch(dsm_Grid) {
			case 1:
				dsm_small = 1
				dsm_medium = 2
				dsm_large = 3
				break;
			case 2:
				dsm_small = 1
				dsm_medium = 2
				dsm_large = 2
				break;
			case 3:
				dsm_small = 1
				dsm_medium = 3
				dsm_large = 3
				break;
			case 4:
				dsm_small = 1
				dsm_medium = 1
				dsm_large = 1
				break;
			case 5:
				dsm_small = 2
				dsm_medium = 2
				dsm_large = 2
				break;	
			case 6:
				dsm_small = 3
				dsm_medium = 3
				dsm_large = 3
				break;		
		}
	},
	// START DISPLAY TEXT ANIMATION //
	textStart : function(){
		dsmObj.devMod('textStart()')
		if($('#trackName').width() <= 185){
			dsmObj.devMod('No Animation')
		} else {
				$('#trackName').animate({left: 0}, 2000)
				$('#trackName').animate({left: "-" + dsm_Text_Width}, dsm_Text_Time_Animate)
				$('#trackName').animate({left: "-" + dsm_Text_Width}, 2000)
				$('#trackName').animate({left: 0}, dsm_Text_Time_Animate, dsmObj.textStart)
		}
	},
	// FINISH DISPLAY TEXT ANIMATION //
	textFinish : function(){
		dsmObj.devMod('textFinish()');
		$('#trackName').clearQueue()
		$('#trackName').stop()
		$('#trackName').removeAttr('style')
	},
	// PLAY, PAUSE, STOP - STYLE BUTTON LOGIC //
	controlBtnState : function(btn){
		if (btn === '#dsmPlay'){
			$('#dsmPlayup polygon').attr('fill', 'rgb(0,255,255)')
			$('#dsmPauseup rect').attr('fill', 'rgb(0,0,0)')
			$('#dsmPauseup rect').attr('stroke', 'rgb(0,0,0)')
			$('#dsmStopup rect').attr('fill', 'rgb(0,0,0)')
			$('#dsmStopup rect').attr('stroke', 'rgb(0,0,0)')
			
		}
		else if (btn === '#dsmPause'){
				dsmObj.devMod('PAUSE UP!!!')
				if($('#dsmPlayup polygon').attr('fill') === 'rgb(0,0,0)' && $('#dsmStopup rect').attr('fill') === 'rgb(0,0,0)'){
					$('#dsmPauseup rect').attr('fill', 'rgb(0,0,0)')
					$('#dsmPauseup rect').attr('stroke', 'rgb(0,0,0)')
					$('#dsmPlayup polygon').attr('fill', 'rgb(0,255,255)')
					$('#dsmStopup rect').attr('fill', 'rgb(0,0,0)')
					$('#dsmStopup rect').attr('stroke', 'rgb(0,0,0)')
					
				} else {
					$('#dsmPauseup rect').attr('fill', 'rgb(0,255,255)')
					$('#dsmPauseup rect').attr('stroke', 'rgb(0,255,255)')
					$('#dsmPlayup polygon').attr('fill', 'rgb(0,0,0)')
					$('#dsmStopup rect').attr('fill', 'rgb(0,0,0)')
					$('#dsmStopup rect').attr('stroke', 'rgb(0,0,0)')
					
				}	
		}
		else if (btn === '#dsmStop'){
				$('#dsmStopup rect').attr('fill', 'rgb(0,255,255)')
				$('#dsmStopup rect').attr('stroke', 'rgb(0,255,255)')
				$('#dsmPlayup polygon').attr('fill', 'rgb(0,0,0)')
				$('#dsmPauseup rect').attr('fill', 'rgb(0,0,0)')
				$('#dsmPauseup rect').attr('stroke', 'rgb(0,0,0)')
		}
	},
	// CHANGE FILL OF PLAYLIST AND ART BUTTON // 
	iconFill : function(id1, id2, id3){
		if (dsm_toggleStatus === 1){
			$(id2 + " path").attr('fill', 'rgb(255,255,255)');
			$(id2 + " path").attr('stroke', 'rgb(255,255,255)');
			$(id3 + " path").attr('fill', 'rgb(0,255,255)');
		}	else if (dsm_toggleStatus === 0){
			$(id2 + " path").attr('fill', 'rgb(139,139,139)');
			$(id2 + " path").attr('stroke', 'rgb(139,139,139)');
			$(id3 + " path").attr('fill', 'rgb(74,134,232)');
		}
	},
	// SHOW, HIDE, ANIMATE, PLAYER CONTAINERs // 
	// (id1 - toggled container, id2,id3 - attr of clicked icon) //
	toggle : function(id1, id2, id3){
		if($(id1).width() > 0){
			dsm_toggleStatus = 0
			dsmObj.iconFill(id1, id2, id3)
			$(id1).animate({width: "0px",  height: "0px"}, 400, function(){
				$(id1).css({border: "0", padding: "0"})
				if(id1 === '#dsmPlayList'){
					dsmObj.css('#dsmPlayListTrack', '0', '0')
					dsmObj.dsmScreenChange(dsmObj.animate)
				} else if (id1 === '#dsmSongArt'){
					dsmObj.css('#dsmCoverArt', '0', '0', '0', '0')
					dsmObj.css('#dsmCoverTitle', '0', '0', '0', '0')
					dsmObj.dsmScreenChange(dsmObj.animate)
				}	
			});
		} else if ($(id1).width() === 0) {
			dsm_toggleStatus = 1
			$(id1).css('height', '1px')
			$(id1).css({border: "2px solid rgba(74,134,232,1)", padding: "5px"})
			dsmObj.dsmScreenChange(dsmObj.animate)
			if(id1 === '#dsmPlayList'){
				$('#dsmPlayListTrack').css({margin: '0 -4px 0 -4px'})
			}
		 }
	},
	passElem : function(id1, id2, id3){
        elem1 = id1,
		elem2 = id2,
		elem3 = id3
	},
	animate : function(div, width, height, left, top){
	dsmObj.devMod(dsm_toggleStatus)
		$(div).clearQueue().stop(dsmObj.iconFill(elem1, elem2, elem3)).animate({
 			width: width,
 			height: height,
 			marginLeft: left,
 			marginTop: top,
 		}, 400);
 		//devMod(dsm_toggleStatus)
	},
	css : function(div, width, height, left, top){
		$(div).css({
 			width: width,
 			height: height,
 			marginLeft: left,
 			marginTop: top,
	 	});
	},
	// WINDOW RESIZE FUNCTIONS //
	resizeWindow : function(){
		$(window).resize(function() {
			dsmObj.devMod('WINDOW-Resize()')
			dsmObj.screenChange_fast();
			dsmObj.dsmScreenChange(dsmObj.css);
		});
	},
	orientationchange : function(){
		$(window).on("orientationchange",function(){
			dsmObj.devMod('WINDOW-OrientationChange()')
			dsmObj.screenChange_fast();
			dsmObj.dsmScreenChange(dsmObj.css);
		});
	},
	screenChange_prop : function(){
		if(dsm_Screen === 1){
			$('#dsmPlayer').css('width', '270px')
			dsmObj.devMod('dsm_Screen: ' + dsm_Screen)
		}
		else if (dsm_Screen === 2){
			$('#dsmPlayer').css({width: '540px'})
			$('#dsmBlockBox').css({
				dispaly: 'block',
				width: '540px',
				height: '193px'
			})
			$('#dsmPlayerControl').css({
				float: 'left'
			})
			$('#dsmSongArt').css({
				display: 'inline-block'
			})
			dsmObj.devMod('dsm_Screen: ' + dsm_Screen)
		}
		else if (dsm_Screen === 3){
			$('#dsmPlayer').css({width: '1080px'})
			$('#dsmBlockBox').css({
				float: 'left',
				width: '540px',
				height: '193px'
			})
			$('#dsmPlayerControl').css({
				float: 'left'
			})
			$('#dsmSongArt').css({
				display: 'inline-block'
			})
			$('#dsmPlayList').css({
				display: 'inline-block'
			})
			dsmObj.devMod('dsm_Screen: ' + dsm_Screen)
		}
	},	
	screenChange_fast : function(){
		if($(window).width() <= 600){
			dsm_Screen = dsm_small;
			dsmObj.screenChange_prop()
		} else if($(window).width() > 600 && $(window).width() <= 1140){
			dsm_Screen = dsm_medium;
			dsmObj.screenChange_prop()
		} else if ($(window).width() > 1140){
			dsm_Screen = dsm_large;
			dsmObj.screenChange_prop()
		}
	},
	defaultStyle_custom : function(fn){
		if(dsm_BoxVisible === 2){
			dsm_toggleStatus = 0
			dsmObj.iconFill("#dsmSongArt", "#dsmCoverIndicator", "#dsmCoverIcon")
			$('#dsmSongArt').css({border: "0", padding: "0"})
			fn('#dsmSongArt', '0', '0', '0', '0')
			fn('#dsmCoverArt', '0', '0', '0', '0')
			fn('#dsmCoverTitle', '0', '0', '0', '0')
			dsmObj.dsmScreenChange(fn)
		} else if(dsm_BoxVisible === 3){
			dsm_toggleStatus = 0
			dsmObj.iconFill("#dsmPlayList", "#dsmPlayListIndicator", "#dsmPlaylistIcon")
			$('#dsmPlayList').css({border: "0", padding: "0"})
			fn('#dsmPlayList', '0', '0', '0', '0')
			fn('#dsmPlayListTrack', '0', '0')
			dsmObj.dsmScreenChange(fn)
		} else if (dsm_BoxVisible === 4){
			dsm_toggleStatus = 0
			dsmObj.iconFill("#dsmSongArt", "#dsmCoverIndicator", "#dsmCoverIcon")
			dsmObj.iconFill("#dsmPlayList", "#dsmPlayListIndicator", "#dsmPlaylistIcon")
			$('#dsmSongArt').css({border: "0", padding: "0"})
			fn('#dsmSongArt', '0', '0', '0', '0')
			fn('#dsmCoverArt', '0', '0', '0', '0')
			fn('#dsmCoverTitle', '0', '0', '0', '0')
			$('#dsmPlayList').css({border: "0", padding: "0"})
			fn('#dsmPlayList', '0', '0', '0', '0')
			fn('#dsmPlayListTrack', '0', '0')
			dsmObj.dsmScreenChange(fn)
		}
	},
	defaultStyle : function(fn){
		dsmObj.devMod('defaultStyle')
		if (dsm_Screen === 1){
			fn('#dsmBlockBox', '270px', '386px', '0', '0')
			fn('#dsmPlayerControl', '255px', '178px', '0', '0')
			fn('#dsmSongArt', '255px', '178px', '0', '0')
			fn('#dsmCoverArt', '197px', '185px', '0', '0')
			fn('#dsmCoverTitle', '70px', '185px', '0', '0')
			fn('#dsmPlayList', '255px', '290px', '0', '0')
			fn('#dsmPlayListTrack', '263px', '290px')
			dsmObj.defaultStyle_custom(fn)
		}
		else if (dsm_Screen === 2){
			fn('#dsmBlockBox', '540px', '193px', '0', '0')
			fn('#dsmPlayerControl', '255px', '178px', '0', '0')
			fn('#dsmSongArt', '255px', '178px', '0', '0')
			fn('#dsmCoverArt', '197px', '185px', '0', '0')
			fn('#dsmCoverTitle', '70px', '185px', '0', '0')
			fn('#dsmPlayList', '525px', '290px', '0', '0')
			fn('#dsmPlayListTrack', '533px', '290px')
			dsmObj.defaultStyle_custom(fn)
		}
		else if (dsm_Screen === 3){
			fn('#dsmBlockBox', '540px', '193px', '0', '0')
			fn('#dsmPlayerControl', '255px', '178px', '0', '0')
			fn('#dsmSongArt', '255px', '178px', '0', '0')
			fn('#dsmCoverArt', '197px', '185px', '0', '0')
			fn('#dsmCoverTitle', '70px', '185px', '0', '0')
			fn('#dsmPlayList', '525px', '178px', '0', '0')
			fn('#dsmPlayListTrack', '533px', '178px')
			dsmObj.defaultStyle_custom(fn)
		}
	},
	dsmScreenChange : function(fn){
		dsmObj.devMod('dsmScreenChange()')
		if (dsm_Screen === 1) /*MAIN SCREEN SMALL*/{
			dsmObj.devMod('size: sx');
			if($('#dsmPlayList').height() === 0 && $('#dsmSongArt').height() === 0){
				dsmObj.devMod('size: sx0 - all hidden');
				fn('#dsmBlockBox', '270px', '193px', '0', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '0', '0', '0', '0')
				fn('#dsmCoverArt', '0', '0', '0', '0')
				fn('#dsmCoverTitle', '0', '0', '0', '0')
				fn('#dsmPlayList', '0', '0', '0', '0')
				fn('#dsmPlayListTrack', '0', '0')
			}
			else if($('#dsmSongArt').height() === 0 && $('#dsmPlayList').height() > 0){
				dsmObj.devMod('size: sx1 - dsmSongArt hidden');
				fn('#dsmBlockBox', '270px', '193px', '0', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '0', '0', '0', '0')
				fn('#dsmCoverArt', '0', '0', '0', '0')
				fn('#dsmCoverTitle', '0', '0', '0', '0')
				fn('#dsmPlayList', '255px', '290px', '0', '0')
				fn('#dsmPlayListTrack', '263px', '290px')
			}
			else if($('#dsmPlayList').height() === 0 && $('#dsmSongArt').height() > 0){
				dsmObj.devMod('size: sx2 - dsmPlayList hidden');
				fn('#dsmBlockBox', '270px', '386px', '0', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '255px', '178px', '0', '0')
				fn('#dsmCoverArt', '197px', '185px', '0', '0')
				fn('#dsmCoverTitle', '70px', '185px', '0', '0')
				fn('#dsmPlayList', '0', '0', '0', '0')
				fn('#dsmPlayListTrack', '0', '0')
			}
			else {
				dsmObj.devMod('size: sx3 - all visible');
				fn('#dsmBlockBox', '270px', '386px', '0', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '255px', '178px', '0', '0')
				fn('#dsmCoverArt', '197px', '185px', '0', '0')
				fn('#dsmCoverTitle', '70px', '185px', '0', '0')
				fn('#dsmPlayList', '255px', '290px', '0', '0')
				fn('#dsmPlayListTrack', '263px', '290px')
			}
		} else if (dsm_Screen === 2) /*MAIN SCREEN MEDIUM*/{
			dsmObj.devMod('size: sm');
			if($('#dsmPlayList').height() === 0 && $('#dsmSongArt').height() === 0){
				dsmObj.devMod('size: sm0 - all hidden');
				fn('#dsmBlockBox', '270px', '193px', '135px', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '0', '0', '0', '0')
				fn('#dsmCoverArt', '0', '0', '0', '0')
				fn('#dsmCoverTitle', '0', '0', '0', '0')
				fn('#dsmPlayList', '0', '0', '0', '0')
				fn('#dsmPlayListTrack', '0', '0')
			}
			else if($('#dsmSongArt').height() === 0 && $('#dsmPlayList').height() > 0){
				dsmObj.devMod('size: sm1 - dsmSongArt hidden');
				fn('#dsmBlockBox', '270px', '193px', '135px', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '0', '0', '0', '0')
				fn('#dsmCoverArt', '0', '0', '0', '0')
				fn('#dsmCoverTitle', '0', '0', '0', '0')
				fn('#dsmPlayList', '255px', '290px', '135px', '0')
				fn('#dsmPlayListTrack', '263px', '290px')
			}
			else if($('#dsmPlayList').height() === 0 && $('#dsmSongArt').height() > 0){
				dsmObj.devMod('size: sm2 - dsmPlayList hidden');
				fn('#dsmBlockBox', '540px', '193px', '0', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '255px', '178px', '0', '0')
				fn('#dsmCoverArt', '197px', '185px', '0', '0')
				fn('#dsmCoverTitle', '70px', '185px', '0', '0')
				fn('#dsmPlayList', '0', '0', '0', '0')
				fn('#dsmPlayListTrack', '0', '0')
			}
			else {
				dsmObj.devMod('size: sm3 - all visible');
				fn('#dsmBlockBox', '540px', '193px', '0', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '255px', '178px', '0', '0')
				fn('#dsmCoverArt', '197px', '185px', '0', '0')
				fn('#dsmCoverTitle', '70px', '185px', '0', '0')
				fn('#dsmPlayList', '525px', '290px', '0', '0')
				fn('#dsmPlayListTrack', '533px', '290px')	
			}
		} else if (dsm_Screen === 3) /*MAIN SCREEN LARGE*/ {
			dsmObj.devMod('size: md');
			if($('#dsmPlayList').height() === 0 && $('#dsmSongArt').height() === 0){
				dsmObj.devMod('size: md0 - all hidden');
				fn('#dsmBlockBox', '270px', '193px', '405px', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '0', '0', '0', '0')
				fn('#dsmCoverArt', '0', '0', '0', '0')
				fn('#dsmCoverTitle', '0', '0', '0', '0')
				fn('#dsmPlayList', '0', '0', '0', '0')
				fn('#dsmPlayListTrack', '0', '0')
			}
			else if($('#dsmSongArt').height() === 0 && $('#dsmPlayList').height() > 0){
				dsmObj.devMod('size: md1 - dsmSongArt hidden');
				fn('#dsmBlockBox', '270px', '193px', '135px', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '0', '0', '0', '0')
				fn('#dsmCoverArt', '0', '0', '0', '0')
				fn('#dsmCoverTitle', '0', '0', '0', '0')
				fn('#dsmPlayList', '525px', '178px', '0', '0')
				fn('#dsmPlayListTrack', '533px', '178px')	
			}
			else if($('#dsmPlayList').height() === 0 && $('#dsmSongArt').height() > 0){
				dsmObj.devMod('size: md2 - dsmPlayList hidden');
				fn('#dsmBlockBox', '540px', '193px', '270px', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '255px', '178px', '0', '0')
				fn('#dsmCoverArt', '197px', '185px', '0', '0')
				fn('#dsmCoverTitle', '70px', '185px', '0', '0')
				fn('#dsmPlayList', '0', '0', '0', '0')
				fn('#dsmPlayListTrack', '0', '0')
			}
			else {
				dsmObj.devMod('size: md3 - all visible');
				fn('#dsmBlockBox', '540px', '193px', '0', '0')
				fn('#dsmPlayerControl', '255px', '178px', '0', '0')
				fn('#dsmSongArt', '255px', '178px', '0', '0')
				fn('#dsmCoverArt', '197px', '185px', '0', '0')
				fn('#dsmCoverTitle', '70px', '185px', '0', '0')
				fn('#dsmPlayList', '525px', '178px', '0', '0')
				fn('#dsmPlayListTrack', '533px', '178px')	
			}
		}
	},
	// DINAMICALLY CREATE PLAYLIST AND INTERACT//
	createPlaylist : function(){
		for (var i= 0; i < dsm_tracks.length; i++){
			// CREATE ELEMENTS //
			var dsm_li = document.createElement('li');
			var artist = document.createElement('span');
			var title = document.createElement('span');
			var numOrder = document.createElement('span');
			var separator = document.createElement('span');
			var dsm_p = document.createElement('p');
			var dsm_Speaker_Icon = document.createElement('span');
			var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			var dsm_liIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			var dsm_liIcon_Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			// TRACK LIST //
			dsm_li.className = 'dsmPLT_li';
			$(dsm_li).attr('id', 'dsmTrack_' + i);
			$(dsm_li).attr('data-active', 'false');
			$(dsm_p).attr('data-track', i);
			$(dsm_p).attr('id', 'dsmTrackName_' + i);
			$(dsm_p).css({'margin' : '-28px 0 0 35px'});
			// ARTIST NAME //
			artist.innerHTML = dsm_tracks[i].artist;
			artist.style.color = 'rgba(255,255,255,0.7)';
			artist.style.textTransform = 'uppercase';
			// SONG NAME //
			title.innerHTML = dsm_tracks[i].title;
			// NUMBER OF SONG //
			$(numOrder).attr('id', 'dsmNumb_' + i);
			numOrder.innerHTML = i+1 + ". ";
			numOrder.style.color = 'rgb(74,134,232)';
			// TEKST SEPARATOR //
			separator.innerHTML = " - ";
			// SPEAKER ICON //
			$(dsm_liIcon).attr('d', 'M 6.8 8.5 L 2.5 8.5 C 1.6 8.5 1 9.2 1 10.1 L 1 14.9 C 1 15.8 1.6 16.5 2.5 16.5 L 6.8 16.5 L 7.3 16.9 L 12.1 20 C 13.1 20.7 13.8 20.3 13.8 19.1 L 13.8 12.5 L 13.8 5.9 C 13.8 4.7 13.1 4.3 12.1 5 L 7.3 8.1 L 6.8 8.5 Z  M 18.5 5.8 C 18.5 5.6 18.9 5.6 19.1 5.6 C 21.5 5.6 23.5 8.6 23.5 12.5 C 23.5 16.4 21.5 19.4 19.1 19.4 C 18.9 19.4 18.5 19.4 18.5 19.2 C 20.4 18.7 22 15.9 22 12.5 C 22 9.1 20.4 6.3 18.5 5.8 Z  M 16.5 7.1 C 16.5 7 16.8 7 17 7 C 18.9 7 20.5 9.4 20.5 12.5 C 20.5 15.6 18.9 18 17 18 C 16.8 18 16.5 18 16.5 17.9 C 18 17.5 19.3 15.2 19.3 12.5 C 19.3 9.8 18 7.6 16.5 7.1 Z  M 15 8.5 C 15 8.4 15.2 8.4 15.4 8.4 C 16.8 8.4 18 10.2 18 12.5 C 18 14.8 16.8 16.6 15.4 16.6 C 15.2 16.6 15 16.6 15 16.5 C 16.1 16.2 17.1 14.6 17.1 12.5 C 17.1 10.4 16.1 8.8 15 8.5 Z  M 14 9.8 C 14 9.8 14.2 9.8 14.3 9.8 C 15.2 9.8 16 11 16 12.5 C 16 14 15.2 15.2 14.3 15.2 C 14.2 15.2 14 15.2 14 15.2 C 14.8 15 15.4 13.9 15.4 12.5 C 15.4 11.1 14.8 10 14 9.8 Z') ;
			$(dsm_liIcon).attr('fill', 'rgb(74,134,232)');
			$(dsm_liIcon_Rect).attr('id', 'dsmliRect_' + i)
			$(dsm_liIcon_Rect).attr('x', '1')
			$(dsm_liIcon_Rect).attr('width', '23')
			$(dsm_liIcon_Rect).attr('height', '23')
			$(dsm_liIcon_Rect).attr('transform', 'matrix(1,0,0,1,0,0)')
			$(dsm_liIcon_Rect).attr('fill', 'rgb(0,0,0)')
			$(dsm_liIcon_Rect).attr('fill-opacity', '0.01')
			$(dsm_liIcon).attr('id', 'dsmliIcon_' + i);
			$(dsm_liIcon_Rect).attr('data-icon', i);
			$(dsm_liIcon_Rect).attr('data-active', true)
			// ADD POINTER //
			dsm_p.style.cursor = 'pointer';
			dsm_liIcon_Rect.style.cursor = 'pointer';
			// ADJUST ELEMENTS //
			document.getElementById('dsmPlayListTrack').appendChild(dsm_li);
			dsm_p.appendChild(numOrder)
			dsm_p.appendChild(artist)
			dsm_p.appendChild(separator)
			dsm_p.appendChild(title)
			svg.setAttribute('viewbox', '0 0 25 25');
			svg.setAttribute('width', '25');
			svg.setAttribute('height', '25');
			dsm_li.appendChild(dsm_Speaker_Icon);
			dsm_li.appendChild(dsm_p);
			dsm_Speaker_Icon.appendChild(svg);
			svg.appendChild(dsm_liIcon);
			svg.appendChild(dsm_liIcon_Rect)
			// ADJUST ACTIVE TRACK //
			if(i === dsm_Track){
				dsm_li.style.border = '2px solid rgb(0, 255, 255)';
				$(dsm_li).attr('data-active', 'true');
				numOrder.style.color = 'rgb(0, 255, 255)';
			 	dsm_liIcon.setAttribute('fill', 'rgb(0, 255, 255)');
			 }
		}
	},
	selectPlaylist : function(){
		for (var i= 0; i < dsm_tracks.length; i++){
				if(i === dsm_Track){
					dsmObj.activePL_scrollTop('#dsmTrack_' + i)
					$('#dsmTrack_' + i).attr('data-active', 'true');
				 	$('#dsmTrack_' + i).css({'border' : '2px solid rgb(0, 255, 255)'})
				 	$('#dsmliIcon_' + i).css({'fill' : 'rgb(0, 255, 255)'});
				 	$('#dsmNumb_' + i).css({'color' : 'rgb(0, 255, 255)'});
				} else {
					$('#dsmTrack_' + i).attr('data-active', 'false');
					$('#dsmTrack_' + i).css({'border' : '1px solid rgb(74,134,232)'})
					$('#dsmliIcon_' + i).css({'fill' : 'rgb(74,134,232)'});
					$('#dsmNumb_' + i).css({'color' : 'rgb(74,134,232)'});
				}
			}
	},
	activePlaylist : function(selected){
		for (var i= 0; i < dsm_tracks.length; i++){
			$('#dsmTrack_' + i).attr('data-active', 'false')
			$('#dsmTrack_' + i).css({'border' : '1px solid rgb(74,134,232)'})
			$('#dsmliIcon_' + i).css({'fill' : 'rgb(74,134,232)'});
			$('#dsmNumb_' + i).css({'color' : 'rgb(74,134,232)'});
		}
		dsmObj.activePL_scrollTop('#dsmTrack_' + selected)
		$('#dsmTrack_' + selected).attr('data-active', 'true');
	 	$('#dsmTrack_' + selected).css({'border' : '2px solid rgb(0, 255, 255)'})
	 	$('#dsmliIcon_' + selected).css({'fill' : 'rgb(0, 255, 255)'});
	 	$('#dsmNumb_' + selected).css({'color' : 'rgb(0, 255, 255)'});
	},
	activePL_scrollTop : function(elem){
		$('.dsm_ScrollBar').clearQueue()
		$('.dsm_ScrollBar').stop()
		if($(elem).offset().top > $('.dsm_ScrollBar').offset().top + $('#dsmPlayListTrack').height() - $(elem).height() || $(elem).offset().top < $('.dsm_ScrollBar').offset().top){
				$('.dsm_ScrollBar').animate({
			scrollTop: $(elem).offset().top - $('.dsm_ScrollBar').offset().top + $('.dsm_ScrollBar').scrollTop()
		}, 1000);
		}
		
	},
	setPlaylistIcon : function(speaker, rect){
		if($(rect).attr('data-active') === 'true'){
			$(speaker).attr('d', 'M 5 16.5 L 2.5 16.5 C 1.6 16.5 1 15.8 1 14.9 L 1 10.1 C 1 9.2 1.6 8.5 2.5 8.5 L 6.8 8.5 L 6.8 8.5 L 7.3 8.1 L 12.1 5 C 12.9 4.5 13.5 4.6 13.7 5.2 L 5 16.5 Z  M 7.6 17.1 L 12.1 20 C 13.1 20.7 13.8 20.3 13.8 19.1 L 13.8 12.5 L 13.8 9.1 L 7.6 17.1 Z  M 14 9.8 C 14 9.8 14.2 9.8 14.3 9.8 C 15.2 9.8 16 11 16 12.5 C 16 14 15.2 15.3 14.3 15.3 C 14.2 15.3 14 15.3 14 15.2 C 14.8 15 15.4 13.9 15.4 12.5 C 15.4 11.1 14.8 10 14 9.8 L 14 9.8 Z  M 16.2 4.3 L 16.2 4.3 C 16.5 4.5 16.5 5 16.2 5.4 L 4.1 20.5 C 3.8 20.8 3.3 20.9 3 20.7 L 3 20.7 C 2.7 20.5 2.7 20 3 19.6 L 15.2 4.5 C 15.4 4.2 15.9 4.1 16.2 4.3 Z')
			$(rect).attr('data-active', 'false')
		} else {
				$(speaker).attr('d', 'M 6.8 8.5 L 2.5 8.5 C 1.6 8.5 1 9.2 1 10.1 L 1 14.9 C 1 15.8 1.6 16.5 2.5 16.5 L 6.8 16.5 L 7.3 16.9 L 12.1 20 C 13.1 20.7 13.8 20.3 13.8 19.1 L 13.8 12.5 L 13.8 5.9 C 13.8 4.7 13.1 4.3 12.1 5 L 7.3 8.1 L 6.8 8.5 Z  M 18.5 5.8 C 18.5 5.6 18.9 5.6 19.1 5.6 C 21.5 5.6 23.5 8.6 23.5 12.5 C 23.5 16.4 21.5 19.4 19.1 19.4 C 18.9 19.4 18.5 19.4 18.5 19.2 C 20.4 18.7 22 15.9 22 12.5 C 22 9.1 20.4 6.3 18.5 5.8 Z  M 16.5 7.1 C 16.5 7 16.8 7 17 7 C 18.9 7 20.5 9.4 20.5 12.5 C 20.5 15.6 18.9 18 17 18 C 16.8 18 16.5 18 16.5 17.9 C 18 17.5 19.3 15.2 19.3 12.5 C 19.3 9.8 18 7.6 16.5 7.1 Z  M 15 8.5 C 15 8.4 15.2 8.4 15.4 8.4 C 16.8 8.4 18 10.2 18 12.5 C 18 14.8 16.8 16.6 15.4 16.6 C 15.2 16.6 15 16.6 15 16.5 C 16.1 16.2 17.1 14.6 17.1 12.5 C 17.1 10.4 16.1 8.8 15 8.5 Z  M 14 9.8 C 14 9.8 14.2 9.8 14.3 9.8 C 15.2 9.8 16 11 16 12.5 C 16 14 15.2 15.2 14.3 15.2 C 14.2 15.2 14 15.2 14 15.2 C 14.8 15 15.4 13.9 15.4 12.5 C 15.4 11.1 14.8 10 14 9.8 Z')
			$(rect).attr('data-active', 'true')
		}
	},
	// SETUP AUDIO PROP //
	loadAudio : function() {
		dsmObj.devMod('loadAudio()');
		// update audio duration //
		if(isNaN(dsm_Audio.duration)){
			$(dsm_Track_Duration).text('00:00');
		} else {
			$(dsm_Track_Duration).text(dsmObj.secondsToHms(Math.round(dsm_Audio.duration)));
			// update rangeslider max value //
			var attributes = {
 				max : dsm_Audio.duration,
 				//step: 1
 			};
 			$(dsm_Rangeslider).attr(attributes);
			$(dsm_Rangeslider).rangeslider('update', true);
			dsmObj.onUdateTrack();
		}
		// play or pause audio //
		if(dsm_Play_Status === false){
			dsm_Audio.pause();
		} else if (dsm_Play_Status === true){
			dsm_Audio.play();
		}
	},
	// STOP PLAYING AUDIO //
	stopAudio : function(){
		dsmObj.controlBtnState("#dsmStop");
		dsm_Audio.pause();
		dsm_Audio.currentTime = 0;
		dsm_Play_Status = false;
		dsm_Stop_Status = true;
	},
	// SET AND CHANGE VOLUME BAR //
	setVolume : function(){
		dsmObj.devMod('setVolume()')
		for(var v = 1; v <=  dsm_Volume; v++){
			$('#dsmVolumeBar > :nth-child(' + v + ')').css('fill', 'white');
		}
		dsm_Audio.volume = dsm_Volume / 10;
	},
	changeVolume : function(v1, v2){
		dsmObj.devMod('changeVolume()')
		if(dsm_Volume !== v1){
			$('#dsmVolumeBar path').css('fill', 'rgb(139,139,139)');
			dsm_Volume = v2;
			dsmObj.setVolume();
		} else {
			dsmObj.setVolume();
		}
	},
	// SETUP NEXT TRACK PROP (NO AUDIO) //
	updateTrackInfo : function(){
		dsmObj.devMod('updateTrackInfo()')
		$(dsm_Track_Name).text(dsm_tracks[dsm_Track].artist + " - " + dsm_tracks[dsm_Track].title);
		$(dsm_Cover_Art).css({"background-image":"url('"+dsm_tracks[dsm_Track].albumArt+"')"});
		$(dsm_Track_Number).text(dsm_Track + 1);
		dsm_Text_Width = $('#trackName').width() - 185;
		dsm_Text_Time_Animate = 26 * $('#trackName').width();
	},
	// UPDATE AND SETUP ALL PROPERTIES //
	updateNextTrack : function(tVar){
		dsmObj.devMod('updateNextTrack()')
		$(dsm_Audio).attr("src", "" + dsm_tracks[tVar].url + "");
		dsmObj.updateTrackInfo();
		dsmObj.textFinish();
		dsmObj.textStart()	
		dsm_Audio.addEventListener("loadedmetadata", function() {
			dsm_Audio.onerror = function() {
    		alert("Audio Error! Make sure that link to audio file is correct");
		};
			if(dsm_Load_Track === true ){
				dsm_Load_Track = false
				dsmObj.devMod('LOADEDMETADATA')
				dsmObj.loadAudio()
			}
		}, false);
	},
	// PLAYBACK RATE //
	setPlaySpeed : function(speed){
		dsm_Audio.playbackRate = speed;
	},
	// AUDIO ON TIME UPDATE FUNCTION //
	onUdateTrack : function(){
		dsm_Audio.addEventListener('timeupdate', function(){
    	dsmObj.devMod('dsm_Audio.ontimeupdate()');
    	// UPDATE CURRENT TIME 
		$(dsm_Track_Time).text(dsmObj.secondsToHms(Math.round(dsm_Audio.currentTime)));
		// UPDATE RANGESLIDER POSITION 
		$(dsm_Rangeslider).val(dsm_Audio.currentTime).change()
		// GO TO REPEAT FUNCTION
		if(dsm_Audio.currentTime === dsm_Audio.duration){
			dsmObj.repeatStatus()
		}
	})
	},
	// CONVERT TIME TO H:M:S //
	secondsToHms : function(d){
		//dsmObj.devMod('secondsToHms()')
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		if(h !== 0){
			var time = ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
		} else{
			time = ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
		}
		return time;
	},
	// REPEAT FUNCTION //
	repeatStatus : function(){
		dsmObj.devMod('repeatStatus()')
		if(dsm_Repeat_Status === 2) {
			dsm_Track+=1;
			while($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false' && dsm_Track < dsm_tracks.length - 1){dsm_Track+= 1}
			if($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false'){
				dsm_Track = 0
				while($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false' && dsm_Track < dsm_tracks.length - 1){dsm_Track+= 1}
			}
			if(dsm_Track === dsm_tracks.length){dsm_Track = 0;}
			dsm_Play_Status = true
			dsm_Load_Track = true;
			if($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false'){
				dsmObj.controlBtnState("#dsmStop")
				dsm_Stop_Status = true;
			} else {
				dsmObj.activePlaylist(dsm_Track)
				dsmObj.updateNextTrack(dsm_Track)
			}
		}	else if (dsm_Repeat_Status === 3){
			dsm_Play_Status = true
			dsm_Load_Track = true;
			dsmObj.activePlaylist(dsm_Track)
			dsmObj.updateNextTrack(dsm_Track)
		} else{
			dsmObj.controlBtnState("#dsmStop")
			dsm_Stop_Status = true;
		}
	},
	// UPDATE TRACK ON SLIDE //
	updateHandle : function(el, val){
		dsmObj.devMod('updateHandle()');
		if ($('#js-rangeslider-0').hasClass('rangeslider--active') === true && $('#dsmliRect_' + dsm_Track).attr('data-active') === 'true'){
			dsm_Audio.currentTime = val;
			if(dsm_Stop_Status === true){
				dsm_Stop_Status = false;
				dsm_Play_Status = false
				dsmObj.controlBtnState("#dsmPause");
			}
		}
	},
	// DEFAULT FUNCTION //
	default : function(){
		// if true - devMod(current running functions name) //
		dsm_devMod = false;
		// SET DEFAULT TRACK PROP //
		dsm_Stop_Status = true;
		dsm_Load_Track = true;
		dsm_Play_Status = false;
		dsm_toggleStatus = 1;
		dsmObj.devMod('default()')
		// INIT RANGESLIDER PLUGIN //
		$(dsm_Rangeslider).rangeslider({
 			polyfill: false,
		});
		dsmObj.controlBtnState('#dsmStop')
		dsm_Track = 0;
		// ADD PLAYLIST //
		dsmObj.createPlaylist();
		// SETUP AUDIO //
		dsm_Audio = new Audio(dsm_tracks[dsm_Track].url);
		dsm_Audio.volume = 0.8;
		dsm_Volume = dsm_Audio.volume * 10;
		dsmObj.setVolume()
		dsmObj.updateNextTrack(dsm_Track)
 		dsm_Audio.onerror = function() {
    		alert("Audio Error! Make sure that link to audio file is correct");
		};
	},
	// SETUP DEVELOPMENT MOD //
	devMod : function(run){
		if (dsm_devMod === true){
			console.log(run);
		}
	}
}
// EVENT LISTENERS //
	$('#dsmPlay').click(function(){
		if($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false'){
				dsmObj.controlBtnState("#dsmStop")
				dsm_Audio.pause();
				dsm_Audio.currentTime = 0;
				dsm_Play_Status = false
				dsm_Stop_Status = true;
		} else {
			dsmObj.controlBtnState("#dsmPlay");
			dsm_Audio.pause();
			dsm_Audio.currentTime = 0;
			dsm_Audio.play();
			dsm_Play_Status = true;
			dsm_Stop_Status = false
		}		
	});
	$('#dsmPause').click(function(){
		
		if(dsm_Stop_Status === true){
			dsmObj.controlBtnState("#dsmStop");
		}else if(dsm_Play_Status === true){
			dsmObj.devMod('audio paused')
			dsmObj.controlBtnState("#dsmPause");
			dsm_Audio.pause();
			dsm_Play_Status = false;
		}else if (dsm_Play_Status === false){
			dsmObj.devMod('audio continue')
			dsmObj.controlBtnState("#dsmPause");
			dsm_Audio.play();
			dsm_Play_Status = true;
		}
	});
	$('#dsmStop').click(function(){
		dsmObj.stopAudio();
	});
	$('#dsmForward').click(function(){
		if(dsm_Fast_Playback === true){
			dsm_Fast_Playback = false
		} else {
			if(dsm_Play_Status === false){
				dsmObj.controlBtnState("#dsmStop");
				dsm_Stop_Status = true;
			}
			if (dsm_Track >= dsm_tracks.length - 1){
				dsm_Track = dsm_tracks.length - 1
			}
			else {
				dsm_Load_Track = true;
				dsm_Track+= 1
				while($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false' && dsm_Track < dsm_tracks.length - 1)
				{
					dsm_Track+= 1
				}
				if($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false'){
					while($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false')
					{
						dsm_Track-= 1
					}
				}
				dsmObj.updateNextTrack(dsm_Track);
				dsmObj.selectPlaylist();
			}
		}
	}).mousedown(function(){
		dsm_TimeOut = setTimeout(function() {
			dsmObj.setPlaySpeed(30);
				dsm_Fast_Playback = true;
		}, 1000);
	}).mouseup(function(){
		clearInterval(dsm_TimeOut);
		dsmObj.setPlaySpeed(1);
	})
	$('#dsmBackward').click(function(){
		if(dsm_Play_Status === false){
			dsmObj.controlBtnState("#dsmStop");
			dsm_Stop_Status = true;
		}
		if (dsm_Track === 0){
			dsm_Track = 0
		} else {
			dsm_Load_Track = true;
			dsm_Track-= 1
			while($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false' && dsm_Track > 0)
			{
				dsm_Track-= 1
			}
			if($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false'){
				while($('#dsmliRect_' + dsm_Track).attr('data-active') === 'false')
				{
					dsm_Track+= 1
				}
			}
			dsmObj.updateNextTrack(dsm_Track);
			dsmObj.selectPlaylist();
		}
	});
	$('#dsmVolPlusIcon').click(function(){
		dsmObj.changeVolume(10,dsm_Volume + 1);
	});
	$('#dsmVolMinusIcon').click(function(){
		dsmObj.changeVolume(0,dsm_Volume - 1);
	});
	$('#dsmRepeatIcon').click(function(){
		if(dsm_Repeat_Status === undefined){
			dsm_Repeat_Status = 1;
		}
		switch(dsm_Repeat_Status){
			case 1:
				$('#dsmRepeatIndicator > :nth-child(1)').css('fill', 'white');
				$('#dsmRepeatIndicator > :nth-child(1)').css('stroke', 'white');
				$('#dsmRepeatIndicator > :nth-child(2)').css('fill', 'white');
				$('#dsmRepeatIndicator > :nth-child(2)').css('stroke', 'white');
				$('#dsmRepeatIcon > :nth-child(1)').css('fill', 'rgb(0,255,255)');
				$('#dsmRepeatIcon > :nth-child(2)').css('fill', 'rgba(0,255,255,0)');
				$('#dsmRepeatIcon > :nth-child(2)').css('stroke', 'rgba(0,255,255,0)');
				dsm_Repeat_Status = 2;
				break;
			case 2:
				$('#dsmRepeatIndicator > :nth-child(1)').css('fill', 'white');
				$('#dsmRepeatIndicator > :nth-child(1)').css('stroke', 'white');
				$('#dsmRepeatIndicator > :nth-child(2)').css('fill', 'rgb(139,139,139)');
				$('#dsmRepeatIndicator > :nth-child(2)').css('stroke', 'rgb(139,139,139)');
				$('#dsmRepeatIcon > :nth-child(1)').css('fill', 'rgb(0,255,255)');
				$('#dsmRepeatIcon > :nth-child(2)').css('fill', 'rgba(0,255,255,1)');
				$('#dsmRepeatIcon > :nth-child(2)').css('stroke', 'rgba(0,255,255,1)');
				dsm_Repeat_Status = 3;
				break;
			default:
				$('#dsmRepeatIndicator > :nth-child(1)').css('fill', 'rgb(139,139,139)');
				$('#dsmRepeatIndicator > :nth-child(1)').css('stroke', 'rgb(139,139,139)');
				$('#dsmRepeatIndicator > :nth-child(2)').css('fill', 'rgb(139,139,139)');
				$('#dsmRepeatIndicator > :nth-child(2)').css('stroke', 'rgb(139,139,139)');
				$('#dsmRepeatIcon > :nth-child(1)').css('fill', 'rgb(74,134,232)');
				$('#dsmRepeatIcon > :nth-child(2)').css('fill', 'rgba(0,255,255,0)');
				$('#dsmRepeatIcon > :nth-child(2)').css('stroke', 'rgba(0,255,255,0)');
				dsm_Repeat_Status = 1;
		}
	});
	$('#dsmCoverIcon').click(function(){
		dsmObj.passElem("#dsmSongArt", "#dsmCoverIndicator", "#dsmCoverIcon")
		dsmObj.toggle("#dsmSongArt", "#dsmCoverIndicator", "#dsmCoverIcon");
	});
	$('#dsmPlaylistIcon').click(function(){
		dsmObj.passElem("#dsmPlayList", "#dsmPlayListIndicator", "#dsmPlaylistIcon")
		dsmObj.toggle("#dsmPlayList", "#dsmPlayListIndicator", "#dsmPlaylistIcon");
	});
	$('#dsmPlayListTrack').on('click', 'p', function(e){
		dsmObj.activePlaylist($(this).attr('data-track'))
		if(dsm_Play_Status === false) {
			dsmObj.controlBtnState("#dsmStop");
			dsm_Stop_Status = true;
		}
		if($('#dsmliRect_' + $(this).attr('data-track')).attr('data-active') === 'false'){
			dsm_Play_Status = false
			dsmObj.controlBtnState("#dsmStop");
			dsm_Stop_Status = true;
		}
		dsm_Load_Track = true;
		dsm_Track = parseInt($(this).attr('data-track'))
		dsmObj.updateNextTrack(dsm_Track);
	})
	$('#dsmPlayListTrack').on('click', 'rect', function(e){
		dsmObj.setPlaylistIcon('#dsmliIcon_' + $(this).attr('data-icon'), this)
		if($('#dsmTrack_' +  $(this).attr('data-icon')).attr('data-active') === 'true'){
				dsmObj.stopAudio();
		}
	})
	$(dsm_Rangeslider).on('input', function(e) {
		var $handle = $('.rangeslider__handle', e.target.nextSibling);
		dsmObj.updateHandle($handle[0], this.value);
  });
  
// INIT DEFAULTs FUNCTIONs //
	if (dsm_Track === undefined){
		dsmObj.devMod('DEFAULT LOADED')
	 	dsmObj.default()
	 	dsmObj.resizeWindow()
	 	dsmObj.orientationchange()
	 	dsmObj.grid();
	 	dsmObj.screenChange_fast()
	 	dsmObj.defaultStyle(dsmObj.css)
	    dsmObj.devMod(dsm_Grid)
	    dsmObj.devMod(dsm_Screen)
	}
}

// START DSM PLAYER //
$(document).ready(function() { 
   dsm_Player(); 
});