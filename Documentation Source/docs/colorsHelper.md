# Colors Helper

## Introduction

ColorsHelper has many functions regarding colors.

The main reason this was created is to enable users to choose colors from a predetermined set.

* Author: Tunahan Görmüş

## Functions List

* [getColor()](#getColor)
* [getRandomColor()](#randomColor)
* [getGradientColorArray()](#gradientArray)
* [colorLerp()](#colorLerp)
* [convertToHex()](#convertHex)
* [convertToRGB()](#convertRGB)

<a name="getColor"></a>

## Get Color

    :::javascript
    PFHelper.getColor(color, subCodes, hex);
    
* `color` Name of the color (string)
* `subCodes` Color tone (string)
* `hex` If true, it starts with "#" prefix. If false it starts with "0x" prefix. (boolean)


&nbsp;


There is two different json file contains different colors.

!!! info "Colors source"
    See [colors.json](https://raw.githubusercontent.com/TayfunTurgut/PFHelper/master/Graphics/colors.json?token=AFO4CQU37K4S2M6AR26PSZK54THBQ) to check out all the colors in our repository!


### Colors With Subs

#### Usage

    :::javascript
    let color = PFHelper.getColor("red", "900", true);
    // subCodes: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, a100, a200, a400, a700

!!! info "Sub Codes"
    You can think of sub-codes as a color tone. If the value is low, it means light and high if it is dark.

<p style="padding: 10px;"> </p>

#### Colors

The sub-codes of the colors shown below are selected as 900.


	
<span class="colorbox-small" style="background-color:#b71c1c;">
<span style="color:#000000">red</span><br/>
</span><span class="colorbox-small" style="background-color:#880e4f; ">
<span style="color:#000000">pink</span><br/>
</span><span class="colorbox-small" style="background-color:#4a148c;">
<span style="color:#000000">purple</span><br/>
</span><span class="colorbox-small" style="background-color:#311b92;">
<span style="color:#000000">deeppurple</span><br/>
</span><span class="colorbox-small" style="background-color:#1a237e;">
<span style="color:#000000">indigo</span><br/>
</span><span class="colorbox-small" style="background-color:#0d47a1;">
<span style="color:#000000">blue</span><br/>
</span><span class="colorbox-small" style="background-color:#01579b;">
<span style="color:#000000">lightblue</span><br/>
</span><span class="colorbox-small" style="background-color:#006064;">
<span style="color:#FFFFFF">cyan</span><br/>
</span><span class="colorbox-small" style="background-color:#004d40;">
<span style="color:#000000">teal</span><br/>
</span><span class="colorbox-small" style="background-color:#1b5e20;">
<span style="color:#FFFFFF">green</span><br/>
</span><span class="colorbox-small" style="background-color:#33691e;">
<span style="color:#000000">lightgreen</span><br/>
</span><span class="colorbox-small" style="background-color:#827717;">
<span style="color:#FFFFFF">lime</span><br/>
</span><span class="colorbox-small" style="background-color:#f57f17;">
<span style="color:#000000">yellow</span><br/>
</span><span class="colorbox-small" style="background-color:#ff6f00;">
<span style="color:#FFFFFF">amber</span><br/>
</span><span class="colorbox-small" style="background-color:#e65100;">
<span style="color:#000000">orange  </span><br/>
</span><span class="colorbox-small" style="background-color:#bf360c;">
<span style="color:#FFFFFF">deeporange</span><br/>
</span><span class="colorbox-small" style="background-color:#3e2723;">
<span style="color:#000000">brown</span><br/>
</span><span class="colorbox-small" style="background-color:#212121;">
<span style="color:#FFFFFF">grey</span><br/>
</span><span class="colorbox-small" style="background-color:#263238;">
<span style="color:#FFFFFF">bluegrey</span>

&nbsp;

<p style="padding: 20px;"> </p>
### Color Palette

#### Usage

    :::javascript
    let color = PFHelper.getColor("red", "", true);

!!! info "Color Palette"
    You don't have to write anything on subCode.


<p style="padding: 5px;"> </p>


#### Colors

<p style="padding: 5px;"> </p>

<span class="colorbox-small" style="background-color:AliceBlue;">
<span style="color:#000000">AliceBlue</span><br/><span style="color:#000000">#F0F8FF</span>
</span><span class="colorbox-small" style="background-color:AntiqueWhite; ">
<span style="color:#000000">AntiqueWhite</span><br/><span style="color:#000000">#FAEBD7</span>
</span><span class="colorbox-small" style="background-color:Aqua;">
<span style="color:#000000">Aqua</span><br/><span style="color:#000000">#00FFFF</span>
</span><span class="colorbox-small" style="background-color:Aquamarine;">
<span style="color:#000000">Aquamarine</span><br/><span style="color:#000000">#7FFFD4</span>
</span><span class="colorbox-small" style="background-color:Azure;">
<span style="color:#000000">Azure</span><br/><span style="color:#000000">#F0FFFF</span>
</span><span class="colorbox-small" style="background-color:Beige;">
<span style="color:#000000">Beige</span><br/><span style="color:#000000">#F5F5DC</span>
</span><span class="colorbox-small" style="background-color:Bisque;">
<span style="color:#000000">Bisque</span><br/><span style="color:#000000">#FFE4C4</span>
</span><span class="colorbox-small" style="background-color:Black;">
<span style="color:#FFFFFF">Black</span><br/><span style="color:#FFFFFF">#000000</span>
</span><span class="colorbox-small" style="background-color:BlanchedAlmond;">
<span style="color:#000000">BlanchedAlmond</span><br/><span style="color:#000000">#FFEBCD</span>
</span><span class="colorbox-small" style="background-color:Blue;">
<span style="color:#FFFFFF">Blue</span><br/><span style="color:#FFFFFF">#0000FF</span>
</span><span class="colorbox-small" style="background-color:BlueViolet;">
<span style="color:#FFFFFF">BlueViolet</span><br/><span style="color:#FFFFFF">#8A2BE2</span>
</span><span class="colorbox-small" style="background-color:Brown;">
<span style="color:#FFFFFF">Brown</span><br/><span style="color:#FFFFFF">#A52A2A</span>
</span><span class="colorbox-small" style="background-color:BurlyWood;">
<span style="color:#000000">BurlyWood</span><br/><span style="color:#000000">#DEB887</span>
</span><span class="colorbox-small" style="background-color:CadetBlue;">
<span style="color:#FFFFFF">CadetBlue</span><br/><span style="color:#FFFFFF">#5F9EA0</span>
</span><span class="colorbox-small" style="background-color:Chartreuse;">
<span style="color:#000000">Chartreuse</span><br/><span style="color:#000000">#7FFF00</span>
</span><span class="colorbox-small" style="background-color:Chocolate;">
<span style="color:#FFFFFF">Chocolate</span><br/><span style="color:#FFFFFF">#D2691E</span>
</span><span class="colorbox-small" style="background-color:Coral;">
<span style="color:#000000">Coral</span><br/><span style="color:#000000">#FF7F50</span>
</span><span class="colorbox-small" style="background-color:CornflowerBlue;">
<span style="color:#FFFFFF">CornflowerBlue</span><br/><span style="color:#FFFFFF">#6495ED</span>
</span><span class="colorbox-small" style="background-color:Cornsilk;">
<span style="color:#000000">Cornsilk</span><br/><span style="color:#000000">#FFF8DC</span>
</span><span class="colorbox-small" style="background-color:Crimson;">
<span style="color:#FFFFFF">Crimson</span><br/><span style="color:#FFFFFF">#DC143C</span>
</span><span class="colorbox-small" style="background-color:Cyan;">
<span style="color:#000000">Cyan</span><br/><span style="color:#000000">#00FFFF</span>
</span><span class="colorbox-small" style="background-color:DarkBlue;">
<span style="color:#FFFFFF">DarkBlue</span><br/><span style="color:#FFFFFF">#00008B</span>
</span><span class="colorbox-small" style="background-color:DarkCyan;">
<span style="color:#FFFFFF">DarkCyan</span><br/><span style="color:#FFFFFF">#008B8B</span>
</span><span class="colorbox-small" style="background-color:DarkGoldenrod;">
<span style="color:#FFFFFF">DarkGoldenrod</span><br/><span style="color:#FFFFFF">#B8860B</span>
</span><span class="colorbox-small" style="background-color:DarkGray;">
<span style="color:#000000">DarkGray</span><br/><span style="color:#000000">#A9A9A9</span>
</span><span class="colorbox-small" style="background-color:DarkGreen;">
<span style="color:#FFFFFF">DarkGreen</span><br/><span style="color:#FFFFFF">#006400</span>
</span><span class="colorbox-small" style="background-color:DarkKhaki;">
<span style="color:#000000">DarkKhaki</span><br/><span style="color:#000000">#BDB76B</span>
</span><span class="colorbox-small" style="background-color:DarkMagenta;">
<span style="color:#FFFFFF">DarkMagenta</span><br/><span style="color:#FFFFFF">#8B008B</span>
</span><span class="colorbox-small" style="background-color:DarkOliveGreen;">
<span style="color:#FFFFFF">DarkOliveGreen</span><br/><span style="color:#FFFFFF">#556B2F</span>
</span><span class="colorbox-small" style="background-color:DarkOrange;">
<span style="color:#000000">DarkOrange</span><br/><span style="color:#000000">#FF8C00</span>
</span><span class="colorbox-small" style="background-color:DarkOrchid;">
<span style="color:#FFFFFF">DarkOrchid</span><br/><span style="color:#FFFFFF">#9932CC</span>
</span><span class="colorbox-small" style="background-color:DarkRed;">
<span style="color:#FFFFFF">DarkRed</span><br/><span style="color:#FFFFFF">#8B0000</span>
</span><span class="colorbox-small" style="background-color:DarkSalmon;">
<span style="color:#000000">DarkSalmon</span><br/><span style="color:#000000">#E9967A</span>
</span><span class="colorbox-small" style="background-color:DarkSeaGreen;">
<span style="color:#000000">DarkSeaGreen</span><br/><span style="color:#000000">#8FBC8B</span>
</span><span class="colorbox-small" style="background-color:DarkSlateBlue;">
<span style="color:#FFFFFF">DarkSlateBlue</span><br/><span style="color:#FFFFFF">#483D8B</span>
</span><span class="colorbox-small" style="background-color:DarkSlateGray;">
<span style="color:#FFFFFF">DarkSlateGray</span><br/><span style="color:#FFFFFF">#2F4F4F</span>
</span><span class="colorbox-small" style="background-color:DarkTurquoise;">
<span style="color:#FFFFFF">DarkTurquoise</span><br/><span style="color:#FFFFFF">#00CED1</span>
</span><span class="colorbox-small" style="background-color:DarkViolet;">
<span style="color:#FFFFFF">DarkViolet</span><br/><span style="color:#FFFFFF">#9400D3</span>
</span><span class="colorbox-small" style="background-color:DeepPink;">
<span style="color:#FFFFFF">DeepPink</span><br/><span style="color:#FFFFFF">#FF1493</span>
</span><span class="colorbox-small" style="background-color:DeepSkyBlue;">
<span style="color:#FFFFFF">DeepSkyBlue</span><br/><span style="color:#FFFFFF">#00BFFF</span>
</span><span class="colorbox-small" style="background-color:DimGray;">
<span style="color:#FFFFFF">DimGray</span><br/><span style="color:#FFFFFF">#696969</span>
</span><span class="colorbox-small" style="background-color:DodgerBlue;">
<span style="color:#FFFFFF">DodgerBlue</span><br/><span style="color:#FFFFFF">#1E90FF</span>
</span><span class="colorbox-small" style="background-color:Firebrick;">
<span style="color:#FFFFFF">Firebrick</span><br/><span style="color:#FFFFFF">#B22222</span>
</span><span class="colorbox-small" style="background-color:FloralWhite;">
<span style="color:#000000">FloralWhite</span><br/><span style="color:#000000">#FFFAF0</span>
</span><span class="colorbox-small" style="background-color:ForestGreen;">
<span style="color:#FFFFFF">ForestGreen</span><br/><span style="color:#FFFFFF">#228B22</span>
</span><span class="colorbox-small" style="background-color:Fuchsia;">
<span style="color:#FFFFFF">Fuchsia</span><br/><span style="color:#FFFFFF">#FF00FF</span>
</span><span class="colorbox-small" style="background-color:Gainsboro;">
<span style="color:#000000">Gainsboro</span><br/><span style="color:#000000">#DCDCDC</span>
</span><span class="colorbox-small" style="background-color:GhostWhite;">
<span style="color:#000000">GhostWhite</span><br/><span style="color:#000000">#F8F8FF</span>
</span><span class="colorbox-small" style="background-color:Gold;">
<span style="color:#000000">Gold</span><br/><span style="color:#000000">#FFD700</span>
</span><span class="colorbox-small" style="background-color:Goldenrod;">
<span style="color:#000000">Goldenrod</span><br/><span style="color:#000000">#DAA520</span>
</span><span class="colorbox-small" style="background-color:Gray;">
<span style="color:#FFFFFF">Gray</span><br/><span style="color:#FFFFFF">#808080</span>
</span><span class="colorbox-small" style="background-color:Green;">
<span style="color:#FFFFFF">Green</span><br/><span style="color:#FFFFFF">#008000</span>
</span><span class="colorbox-small" style="background-color:GreenYellow;">
<span style="color:#000000">GreenYellow</span><br/><span style="color:#000000">#ADFF2F</span>
</span><span class="colorbox-small" style="background-color:Honeydew;">
<span style="color:#000000">Honeydew</span><br/><span style="color:#000000">#F0FFF0</span>
</span><span class="colorbox-small" style="background-color:HotPink;">
<span style="color:#000000">HotPink</span><br/><span style="color:#000000">#FF69B4</span>
</span><span class="colorbox-small" style="background-color:IndianRed;">
<span style="color:#FFFFFF">IndianRed</span><br/><span style="color:#FFFFFF">#CD5C5C</span>
</span><span class="colorbox-small" style="background-color:Indigo;">
<span style="color:#FFFFFF">Indigo</span><br/><span style="color:#FFFFFF">#4B0082</span>
</span><span class="colorbox-small" style="background-color:Ivory;">
<span style="color:#000000">Ivory</span><br/><span style="color:#000000">#FFFFF0</span>
</span><span class="colorbox-small" style="background-color:Khaki;">
<span style="color:#000000">Khaki</span><br/><span style="color:#000000">#F0E68C</span>
</span><span class="colorbox-small" style="background-color:Lavender;">
<span style="color:#000000">Lavender</span><br/><span style="color:#000000">#E6E6FA</span>
</span><span class="colorbox-small" style="background-color:LavenderBlush;">
<span style="color:#000000">LavenderBlush</span><br/><span style="color:#000000">#FFF0F5</span>
</span><span class="colorbox-small" style="background-color:LawnGreen;">
<span style="color:#000000">LawnGreen</span><br/><span style="color:#000000">#7CFC00</span>
</span><span class="colorbox-small" style="background-color:LemonChiffon;">
<span style="color:#000000">LemonChiffon</span><br/><span style="color:#000000">#FFFACD</span>
</span><span class="colorbox-small" style="background-color:LightBlue;">
<span style="color:#000000">LightBlue</span><br/><span style="color:#000000">#ADD8E6</span>
</span><span class="colorbox-small" style="background-color:LightCoral;">
<span style="color:#000000">LightCoral</span><br/><span style="color:#000000">#F08080</span>
</span><span class="colorbox-small" style="background-color:LightCyan;">
<span style="color:#000000">LightCyan</span><br/><span style="color:#000000">#E0FFFF</span>
</span><span class="colorbox-small" style="background-color:LightGoldenrodYellow;">
<span style="color:#000000">LightGoldenrodYellow</span><br/><span style="color:#000000">#FAFAD2</span>
</span><span class="colorbox-small" style="background-color:LightGreen;">
<span style="color:#000000">LightGreen</span><br/><span style="color:#000000">#90EE90</span>
</span><span class="colorbox-small" style="background-color:LightGray;">
<span style="color:#000000">LightGray</span><br/><span style="color:#000000">#D3D3D3</span>
</span><span class="colorbox-small" style="background-color:LightPink;">
<span style="color:#000000">LightPink</span><br/><span style="color:#000000">#FFB6C1</span>
</span><span class="colorbox-small" style="background-color:LightSalmon;">
<span style="color:#000000">LightSalmon</span><br/><span style="color:#000000">#FFA07A</span>
</span><span class="colorbox-small" style="background-color:LightSeaGreen;">
<span style="color:#FFFFFF">LightSeaGreen</span><br/><span style="color:#FFFFFF">#20B2AA</span>
</span><span class="colorbox-small" style="background-color:LightSkyBlue;">
<span style="color:#000000">LightSkyBlue</span><br/><span style="color:#000000">#87CEFA</span>
</span><span class="colorbox-small" style="background-color:LightSlateGray;">
<span style="color:#FFFFFF">LightSlateGray</span><br/><span style="color:#FFFFFF">#778899</span>
</span><span class="colorbox-small" style="background-color:LightSteelBlue;">
<span style="color:#000000">LightSteelBlue</span><br/><span style="color:#000000">#B0C4DE</span>
</span><span class="colorbox-small" style="background-color:LightYellow;">
<span style="color:#000000">LightYellow</span><br/><span style="color:#000000">#FFFFE0</span>
</span><span class="colorbox-small" style="background-color:Lime;">
<span style="color:#FFFFFF">Lime</span><br/><span style="color:#FFFFFF">#00FF00</span>
</span><span class="colorbox-small" style="background-color:LimeGreen;">
<span style="color:#FFFFFF">LimeGreen</span><br/><span style="color:#FFFFFF">#32CD32</span>
</span><span class="colorbox-small" style="background-color:Linen;">
<span style="color:#000000">Linen</span><br/><span style="color:#000000">#FAF0E6</span>
</span><span class="colorbox-small" style="background-color:Magenta;">
<span style="color:#FFFFFF">Magenta</span><br/><span style="color:#FFFFFF">#FF00FF</span>
</span><span class="colorbox-small" style="background-color:Maroon;">
<span style="color:#FFFFFF">Maroon</span><br/><span style="color:#FFFFFF">#800000</span>
</span><span class="colorbox-small" style="background-color:MediumAquamarine;">
<span style="color:#000000">MediumAquamarine</span><br/><span style="color:#000000">#66CDAA</span>
</span><span class="colorbox-small" style="background-color:MediumBlue;">
<span style="color:#FFFFFF">MediumBlue</span><br/><span style="color:#FFFFFF">#0000CD</span>
</span><span class="colorbox-small" style="background-color:MediumOrchid;">
<span style="color:#FFFFFF">MediumOrchid</span><br/><span style="color:#FFFFFF">#BA55D3</span>
</span><span class="colorbox-small" style="background-color:MediumPurple;">
<span style="color:#FFFFFF">MediumPurple</span><br/><span style="color:#FFFFFF">#9370DB</span>
</span><span class="colorbox-small" style="background-color:MediumSeaGreen;">
<span style="color:#FFFFFF">MediumSeaGreen</span><br/><span style="color:#FFFFFF">#3CB371</span>
</span><span class="colorbox-small" style="background-color:MediumSlateBlue;">
<span style="color:#FFFFFF">MediumSlateBlue</span><br/><span style="color:#FFFFFF">#7B68EE</span>
</span><span class="colorbox-small" style="background-color:MediumSpringGreen;">
<span style="color:#000000">MediumSpringGreen</span><br/><span style="color:#000000">#00FA9A</span>
</span><span class="colorbox-small" style="background-color:MediumTurquoise;">
<span style="color:#000000">MediumTurquoise</span><br/><span style="color:#000000">#48D1CC</span>
</span><span class="colorbox-small" style="background-color:MediumVioletRed;">
<span style="color:#FFFFFF">MediumVioletRed</span><br/><span style="color:#FFFFFF">#C71585</span>
</span><span class="colorbox-small" style="background-color:MidnightBlue;">
<span style="color:#FFFFFF">MidnightBlue</span><br/><span style="color:#FFFFFF">#191970</span>
</span><span class="colorbox-small" style="background-color:MintCream;">
<span style="color:#000000">MintCream</span><br/><span style="color:#000000">#F5FFFA</span>
</span><span class="colorbox-small" style="background-color:MistyRose;">
<span style="color:#000000">MistyRose</span><br/><span style="color:#000000">#FFE4E1</span>
</span><span class="colorbox-small" style="background-color:Moccasin;">
<span style="color:#000000">Moccasin</span><br/><span style="color:#000000">#FFE4B5</span>
</span><span class="colorbox-small" style="background-color:NavajoWhite;">
<span style="color:#000000">NavajoWhite</span><br/><span style="color:#000000">#FFDEAD</span>
</span><span class="colorbox-small" style="background-color:Navy;">
<span style="color:#FFFFFF">Navy</span><br/><span style="color:#FFFFFF">#000080</span>
</span><span class="colorbox-small" style="background-color:OldLace;">
<span style="color:#000000">OldLace</span><br/><span style="color:#000000">#FDF5E6</span>
</span><span class="colorbox-small" style="background-color:Olive;">
<span style="color:#FFFFFF">Olive</span><br/><span style="color:#FFFFFF">#808000</span>
</span><span class="colorbox-small" style="background-color:OliveDrab;">
<span style="color:#FFFFFF">OliveDrab</span><br/><span style="color:#FFFFFF">#6B8E23</span>
</span><span class="colorbox-small" style="background-color:Orange;">
<span style="color:#000000">Orange</span><br/><span style="color:#000000">#FFA500</span>
</span><span class="colorbox-small" style="background-color:OrangeRed;">
<span style="color:#FFFFFF">OrangeRed</span><br/><span style="color:#FFFFFF">#FF4500</span>
</span><span class="colorbox-small" style="background-color:Orchid;">
<span style="color:#000000">Orchid</span><br/><span style="color:#000000">#DA70D6</span>
</span><span class="colorbox-small" style="background-color:PaleGoldenrod;">
<span style="color:#000000">PaleGoldenrod</span><br/><span style="color:#000000">#EEE8AA</span>
</span><span class="colorbox-small" style="background-color:PaleGreen;">
<span style="color:#000000">PaleGreen</span><br/><span style="color:#000000">#98FB98</span>
</span><span class="colorbox-small" style="background-color:PaleTurquoise;">
<span style="color:#000000">PaleTurquoise</span><br/><span style="color:#000000">#AFEEEE</span>
</span><span class="colorbox-small" style="background-color:PaleVioletRed;">
<span style="color:#FFFFFF">PaleVioletRed</span><br/><span style="color:#FFFFFF">#DB7093</span>
</span><span class="colorbox-small" style="background-color:PapayaWhip;">
<span style="color:#000000">PapayaWhip</span><br/><span style="color:#000000">#FFEFD5</span>
</span><span class="colorbox-small" style="background-color:PeachPuff;">
<span style="color:#000000">PeachPuff</span><br/><span style="color:#000000">#FFDAB9</span>
</span><span class="colorbox-small" style="background-color:Peru;">
<span style="color:#FFFFFF">Peru</span><br/><span style="color:#FFFFFF">#CD853F</span>
</span><span class="colorbox-small" style="background-color:Pink;">
<span style="color:#000000">Pink</span><br/><span style="color:#000000">#FFC0CB</span>
</span><span class="colorbox-small" style="background-color:Plum;">
<span style="color:#000000">Plum</span><br/><span style="color:#000000">#DDA0DD</span>
</span><span class="colorbox-small" style="background-color:PowderBlue;">
<span style="color:#000000">PowderBlue</span><br/><span style="color:#000000">#B0E0E6</span>
</span><span class="colorbox-small" style="background-color:Purple;">
<span style="color:#FFFFFF">Purple</span><br/><span style="color:#FFFFFF">#800080</span>
</span><span class="colorbox-small" style="background-color:Red;">
<span style="color:#FFFFFF">Red</span><br/><span style="color:#FFFFFF">#FF0000</span>
</span><span class="colorbox-small" style="background-color:RebeccaPurple;">
<span style="color:#FFFFFF">RebeccaPurple</span><br/><span style="color:#FFFFFF">#663399</span>
</span><span class="colorbox-small" style="background-color:RosyBrown;">
<span style="color:#000000">RosyBrown</span><br/><span style="color:#000000">#BC8F8F</span>
</span><span class="colorbox-small" style="background-color:RoyalBlue;">
<span style="color:#FFFFFF">RoyalBlue</span><br/><span style="color:#FFFFFF">#4169E1</span>
</span><span class="colorbox-small" style="background-color:SaddleBrown;">
<span style="color:#FFFFFF">SaddleBrown</span><br/><span style="color:#FFFFFF">#8B4513</span>
</span><span class="colorbox-small" style="background-color:Salmon;">
<span style="color:#000000">Salmon</span><br/><span style="color:#000000">#FA8072</span>
</span><span class="colorbox-small" style="background-color:SandyBrown;">
<span style="color:#000000">SandyBrown</span><br/><span style="color:#000000">#F4A460</span>
</span><span class="colorbox-small" style="background-color:SeaGreen;">
<span style="color:#FFFFFF">SeaGreen</span><br/><span style="color:#FFFFFF">#2E8B57</span>
</span><span class="colorbox-small" style="background-color:SeaShell;">
<span style="color:#000000">SeaShell</span><br/><span style="color:#000000">#FFF5EE</span>
</span><span class="colorbox-small" style="background-color:Sienna;">
<span style="color:#FFFFFF">Sienna</span><br/><span style="color:#FFFFFF">#A0522D</span>
</span><span class="colorbox-small" style="background-color:Silver;">
<span style="color:#000000">Silver</span><br/><span style="color:#000000">#C0C0C0</span>
</span><span class="colorbox-small" style="background-color:SkyBlue;">
<span style="color:#000000">SkyBlue</span><br/><span style="color:#000000">#87CEEB</span>
</span><span class="colorbox-small" style="background-color:SlateBlue;">
<span style="color:#FFFFFF">SlateBlue</span><br/><span style="color:#FFFFFF">#6A5ACD</span>
</span><span class="colorbox-small" style="background-color:SlateGray;">
<span style="color:#FFFFFF">SlateGray</span><br/><span style="color:#FFFFFF">#708090</span>
</span><span class="colorbox-small" style="background-color:Snow;">
<span style="color:#000000">Snow</span><br/><span style="color:#000000">#FFFAFA</span>
</span><span class="colorbox-small" style="background-color:SpringGreen;">
<span style="color:#000000">SpringGreen</span><br/><span style="color:#000000">#00FF7F</span>
</span><span class="colorbox-small" style="background-color:SteelBlue;">
<span style="color:#FFFFFF">SteelBlue</span><br/><span style="color:#FFFFFF">#4682B4</span>
</span><span class="colorbox-small" style="background-color:Tan;">
<span style="color:#000000">Tan</span><br/><span style="color:#000000">#D2B48C</span>
</span><span class="colorbox-small" style="background-color:Teal;">
<span style="color:#FFFFFF">Teal</span><br/><span style="color:#FFFFFF">#008080</span>
</span><span class="colorbox-small" style="background-color:Thistle;">
<span style="color:#000000">Thistle</span><br/><span style="color:#000000">#D8BFD8</span>
</span><span class="colorbox-small" style="background-color:Tomato;">
<span style="color:#FFFFFF">Tomato</span><br/><span style="color:#FFFFFF">#FF6347</span>
</span><span class="colorbox-small" style="background-color:Turquoise;">
<span style="color:#000000">Turquoise</span><br/><span style="color:#000000">#40E0D0</span>
</span><span class="colorbox-small" style="background-color:Violet;">
<span style="color:#000000">Violet</span><br/><span style="color:#000000">#EE82EE</span>
</span><span class="colorbox-small" style="background-color:Wheat;">
<span style="color:#000000">Wheat</span><br/><span style="color:#000000">#F5DEB3</span>
</span><span class="colorbox-small" style="background-color:White;">
<span style="color:#000000">White</span><br/><span style="color:#000000">#FFFFFF</span>
</span><span class="colorbox-small" style="background-color:WhiteSmoke;">
<span style="color:#000000">WhiteSmoke</span><br/><span style="color:#000000">#F5F5F5</span>
</span><span class="colorbox-small" style="background-color:Yellow;">
<span style="color:#000000">Yellow</span><br/><span style="color:#000000">#FFFF00</span>
</span><span class="colorbox-small" style="background-color:YellowGreen;">
<span style="color:#000000">YellowGreen</span><br/><span style="color:#000000">#9ACD32</span>
</span>
&nbsp;

<a name="randomColor"></a>
<p style="padding: 50px;"> </p>


## Get Random Color 

Returns a random color.

### Usage

    :::javascript
    let color = PFHelper.getRandomColor(hex);

* `hex` If true, it starts with "#" prefix. If false it starts with "0x" prefix. (bool)


<a name="gradientArray"></a>

## Get Gradient Color Array

Returns a gradient color array from given start color and end color.

### Usage

    :::javascript
    let color = PFHelper.getGradientColor(startColor, endColor, colorCount, hex);
    // color variable is Array now.

* `startColor` A string representing "start color" of the gradient array. (string)
* `endColor` A string representing "end color" of the gradient array. (string)
* `colorCount` Size of the gradient array. (number)
* `hex` If true, it starts with "#" prefix. If false it starts with "0x" prefix. (bool)


<a name="colorLerp"></a>

## Color Lerp

Similar to mapValue, this function lerps one color towards other and you can get any intermediate color with ratio.

### Usage

    :::javascript
    let color = PFHelper.colorLerp(startColor, ratio, colorCount, hex);

* `startColor` A string representing "start color" (string)
* `endColor` A string representing "end color" (string)
* `ratio` A number between 0-1 to get the intermediate color. (float)
* `hex` If true, it starts with "#" prefix. If false it starts with "0x" prefix. (bool)

<a name="convertHex"></a>


## Convert To Hex

Convert RGB to hex string.

### Usage

    :::javascript
    let color = PFHelper.convertToHex(rgb, hex);

* `rgb` An array which contains the RGB values. (array)
* `hex` If true, it starts with "#" prefix. If false it starts with "0x" prefix. (bool)

<a name="convertRGB"></a>


## Convert To RGB

Convert a hex string to an RGB triplet.

### Usage

    :::javascript
    let color = PFHelper.convertToHex(hexValue);

* `hexValue` Hex string "can start with '#' or '0x' or without any". (string)