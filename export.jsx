"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(indent=gap="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if((rep=e)&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

    // var effectObj = { // the entire effect, contains all effects, values, properties, keyframes
    //     components: [ // each effect/component applied
    //     {
    //         name: "",
    //         matchName: "",
    //         properties: [ // each property within a given effect
    //         {
    //             name: "",
    //             value: "", // static value
    //             keyTimes: [], // list of the keyframe time percentages (keyTime / clipDuration)
    //             keyValues: [] // values of the keyframes
    //         },
    //         ]
    //     }
    //     ]
    // }

//applyEffect(app.project.activeSequence.videoTracks[0].clips[1], File("~/Documents/Motion_01.json"));
exportEffect("Color_01", app.project.activeSequence.videoTracks[1].clips[0], app.project.activeSequence, "~/Documents");

function exportEffect(name, clip, sequence, saveLocation) {
    var exportFile = File(saveLocation+"/"+name+".json");
    var effectObj = {
        components: []
    };

    for(var c = 0; c < clip.components.length; c++) {
        var thisComponent = clip.components[c];
        if(thisComponent.displayName != "Motion" && thisComponent.displayName != "Opacity") {
        effectObj.components.push({name:thisComponent.displayName, matchName: thisComponent.matchName, properties:[]});
        var componentJSON = effectObj.components[c];

        for(var p = 0; p < thisComponent.properties.length; p++) {
            $.writeln("p = " + p);
            $.writeln(thisComponent.displayName);
            $.writeln(thisComponent.properties[p].getValue().toString());
            $.writeln("p = " + p);

try {
            componentJSON.properties.push({name: thisComponent.properties[p].displayName, value: thisComponent.properties[p].getValue(), keyTimes:[], keyValues:[]});
            } catch(e) {
                alert(e);
                }
            var thisProperty = componentJSON.properties[p];
            if(thisComponent.properties[p].isTimeVarying()) {
                var actualKeyTimes = thisComponent.properties[p].getKeys();
                for(var k = 0; k < actualKeyTimes.length; k++) {
                    // actualKeyTime[n] is a time obj, whose seconds are in "clip time", not sequence time
                    var thisKeyValue = thisComponent.properties[p].getValueAtKey(actualKeyTimes[k]);
                    // each keyTime is a time multiplier between [0.0-1.0] 
                    thisProperty.keyTimes.push((actualKeyTimes[k].seconds-clip.inPoint.seconds)/(clip.outPoint.seconds-clip.inPoint.seconds));
                    thisProperty.keyValues.push(thisKeyValue);
                }
            }
        }
    }
    }
    exportFile.open("w");
    exportFile.write(JSON.stringify(effectObj));
    exportFile.close();
}

function applyEffect(clip, jsonFile) {
    app.enableQE();
    jsonFile.open("r");
    var effectJSON = JSON.parse(jsonFile.read());
    jsonFile.close();

    for(var e = 0; e < effectJSON.components.length; e++) {
        var thisComponent = effectJSON.components[e];
        var thisQETrack = getQEVersionOfClip(clip);
        thisQETrack.addVideoEffect(qe.project.getVideoEffectByName(thisComponent.name));
        var thisAppliedComponent = getComponentNamed(clip, thisComponent.name);

        for(var p = 0; p < thisAppliedComponent.properties.length; p++) {
            var thisProperty = thisComponent.properties[p];
            var thisActualProperty = getPropertyNamed(thisAppliedComponent, thisProperty.name);
            thisActualProperty.setValue(thisProperty.value, true);
            if(thisProperty.keyTimes.length > 0) {
                for(var k = 0; k < thisProperty.keyTimes.length; k++) {
                    if(!thisActualProperty.isTimeVarying()) thisActualProperty.setTimeVarying(true);
                    var applyTimeSeconds = clip.inPoint.seconds + (thisProperty.keyTimes[k] * (clip.outPoint.seconds - clip.inPoint.seconds));
                    thisActualProperty.addKey(applyTimeSeconds);
                    thisActualProperty.setValueAtKey(applyTimeSeconds, thisProperty.keyValues[k]);
                }
            }
        }
    }
}

function getPropertyNamed(component, name) {
    for(var g = 0; g < component.properties.length; g++) {
        if(component.properties[g].displayName == name) return component.properties[g];
    }
    return null;
}

function getComponentNamed(clip, name) {
    // we'll read components backwards to make sure we get the last applied one, in case there are multiple effects with the same name applied
    for(var c = clip.components.length-1; c >= 0; c--) {
        if(clip.components[c].displayName == name) return clip.components[c];
    }
    return null;
}

function timeToSeconds(timeString, frameRate) {
    var segments = timeString.split(':');
    if (segments.length !== 4) {
        return null; // Invalid format
    }
    
    var hours = parseInt(segments[0], 10);
    var minutes = parseInt(segments[1], 10);
    var seconds = parseInt(segments[2], 10);
    var frames = parseInt(segments[3], 10);

    var framesInSeconds = frames / frameRate;
    return hours * 3600 + minutes * 60 + seconds + framesInSeconds;
}

function getQEVersionOfClip(clipObj) {

    var framerate = 1/app.project.activeSequence.getSettings()["videoFrameRate"].seconds;
    var vanSequence = app.project.activeSequence;
    var qeSequence = qe.project.getActiveSequence(0);
    var thisQETrack, thisTrack;
    
    for(var t = 0; t < vanSequence.videoTracks.numTracks; t++) {
        thisQETrack = qeSequence.getVideoTrackAt(t);
        thisTrack = vanSequence.videoTracks[t];
        for(var tt = 0; tt < thisQETrack.numItems; tt++) {
            if(thisQETrack.getItemAt(tt).type.toString() != "Empty") {
            if(thisQETrack.getItemAt(tt).name == clipObj.name && timeToSeconds(thisQETrack.getItemAt(tt).duration.toString(), framerate).toFixed(5) == clipObj.duration.seconds.toFixed(5)) {
                return thisQETrack.getItemAt(tt);
            }
        }
        }
    }

    return null;
}