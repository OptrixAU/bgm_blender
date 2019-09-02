idno = 0;

var countIn=prompt("How many would you like to create?","5","Enter Number:");

var iv = parseInt(countIn);

var doc = app.activeDocument;

var built = [];
var done = [];

for(var idno=0;idno<iv;idno++)
{
	for(var i=0;i < doc.layers.length;i++)
	{
		var lyr = doc.layers[i]
		lyr.visible = true
		if (lyr.layers)
		{
			var found = false;
			for(var qr = 0;qr < built.length;qr++)
			{
				if (built[qr] == lyr)
				{
					found = true;
					break;
				}
			}
			for(var qr = 0;qr < built.length;qr++)
			{
				if (done[qr] == lyr)
				{
					found = true;
					break;
				}
			}
			if (found == true)
			{
				continue;
			}
			
			
			if (lyr.name.indexOf("(HEXCORNER)") > 0)
			{
				//Disable all layers...
				for(var x=0;x<lyr.layers.length;x++)
				{
					lyr.layers[x].visible = false
				}
								
				//Now re-enable layers randomly group-by-group.
				for(var x=0;x<6;x++)
				{
					var itm = (Math.random() * lyr.layers.length.toFixed(2))|0;
					//alert(itm + " - " + lyr.layers[itm].name);
					var ly = lyr.layers[itm].duplicate();		
					ly.move(lyr,ElementPlacement.PLACEBEFORE);
					ly.visible = true;
					if (x > 0)
					{
						ly.rotate(60*x);
					}
					built.push(ly);
				}				
			}	
			
			var magic = null;

			if (lyr.name.indexOf("(1)") > 0)
			{
				var itm = (Math.random() * lyr.layers.length)|0;
				magic = lyr.layers[itm].duplicate();
				magic.move(lyr,ElementPlacement.PLACEBEFORE);
				magic.visible = true;				
				built.push(magic);
			}
			
			if (lyr.name.indexOf("(R)") > 0)
			{
				var itm = (Math.random() * 360)|0;
				magic.rotate(itm);
			}
			
			if (lyr.name.indexOf("(T)") > 0)
			{
				var xoffset = (Math.random() * (app.activeDocument.width / 2))|0;
				var yoffset = (Math.random() * (app.activeDocument.height / 2))|0;
				magic.translate(xoffset,toffset);
			}
			
			done.push(lyr);
		}
		
		if (doc.layers[i].name == "IDNO")
		{
			doc.layers[i].textItem.contents = "" + (idno+1);
		}
	}
	
	//doc.layers.getByName("IDNO")

	var errors = false;
	try
	{
		var Path = decodeURI(activeDocument.path);
	}
	catch(e)
	{
		alert(e);
		errors = true;
	}

	if(!Folder(Path).exists)
	{
		errors = true;
		alert(Path + " Does not exist!");
	}

	if (errors == false)
	{
		var Name = decodeURI(app.activeDocument.name).replace(/\.[^\.]+$/, '');
		var saveFile = File(Path + "/" + Name + "_" + idno + ".png");

		sfwPNG24(saveFile);
	}
	
	for(var rv = 0; rv < built.length;rv++)
	{
		built[rv].remove();
	}
	
	built = [];
	done = [];
}

function sfwPNG24(saveFile)
{
	var pngOpts = new PNGSaveOptions;
	pngOpts.compression = 9;
	pngOpts.interlaced = false;

	activeDocument.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE);
}