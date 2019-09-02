idno = 0;

var inFolder = new Folder("/g/development/creaturefeature/exploration");

if(inFolder != null){
	var fileList = inFolder.getFiles(/\.(psd|)$/i);
	for(var a = 0 ;a < fileList.length; a++)
	{
		var docRef = open(fileList[a]);			
		var dest = (fileList[a]+"").replace(".psd",".png");
		
		var count = 1;
		var ind = dest.lastIndexOf('(');
		var eind = dest.lastIndexOf(')');
		if (ind > 0)
		{
			count = parseInt(dest.substr(ind+1,eind-(ind+1));
		}
		
		for(var i = 0;i<count;i++)
		{
			var Name = decodeURI(app.activeDocument.name).replace(/\.[^\.]+$/, '');
			if (i > 0)
			{
				Name = Name + "_" + count;
			}
			var saveFile = File(Name + ".png");
			sfwPNG24(saveFile);
		}		
		
		docRef.close();
		break;
	}
}


function sfwPNG32(saveFile)
{
	var pngOpts = new PNGSaveOptions;
	pngOpts.compression = 9;
	pngOpts.interlaced = false;

	activeDocument.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE);
}