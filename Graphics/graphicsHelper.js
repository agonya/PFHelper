class GraphicsHelper {
	constructor(graphics) {
		this.allGraphics = []
		this.graphics = graphics;
		this.allGraphics.push(this.graphics);
	}

	lineStyle(lineWidth, color, alpha) {
		this.lineWidth = lineWidth;
		this.lineColor = color;
		this.lineAlpha = (alpha == undefined) ? 1 : alpha;
	}

	fillStyle(color, alpha) {
		this.fillColor = color;
		this.fillAlpha = (alpha == undefined) ? 1 : alpha;
	}

	strokeRoundedRect(leftX, topY, width, height, radius) {
		if (this.graphics.arcTopRight == undefined) {
			this.graphics.arcTopRight = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcTopRight);
		}
		if (this.graphics.arcBottomRight == undefined) {
			this.graphics.arcBottomRight = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcBottomRight);
		}
		if (this.graphics.arcBottomLeft == undefined) {
			this.graphics.arcBottomLeft = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcBottomLeft);
		}
		if (this.graphics.arcTopLeft == undefined) {
			this.graphics.arcTopLeft = this.graphics.scene.add.graphics();
			this.allGraphics.push(this.graphics.arcTopLeft);
		}

		this.graphics.beginPath();

		this.graphics.moveTo(leftX + radius, topY);
		this.graphics.lineTo(leftX + width - radius, topY);
		this.drawArc(this.graphics.arcTopRight, leftX + width - radius, topY + radius, radius, 1.5 * Math.PI, 0);
		this.graphics.moveTo(leftX + width, topY + radius);
		this.graphics.lineTo(leftX + width, topY + height - radius);
		this.drawArc(this.graphics.arcBottomRight, leftX + width - radius, topY + height - radius, radius, 0, 0.5 * Math.PI);
		this.graphics.moveTo(leftX + width - radius, topY + height);
		this.graphics.lineTo(leftX + radius, topY + height);
		this.drawArc(this.graphics.arcBottomLeft, leftX + radius, topY + height - radius, radius, 0.5 * Math.PI, Math.PI);
		this.graphics.moveTo(leftX, topY + height - radius);
		this.graphics.lineTo(leftX, topY + radius);
		this.drawArc(this.graphics.arcTopLeft, leftX + radius, topY + radius, radius, Math.PI, 1.5 * Math.PI);

		this.graphics.closePath();
		this.graphics.strokePath();

	}

	drawArc(graphics, centerX, centerY, radius, startAngle, endAngle) {
		graphics.clear();
		graphics.lineStyle(this.lineWidth, this.lineColor, this.lineAlpha);
		graphics.beginPath();
		graphics.arc(0, 0, radius, startAngle, endAngle);
		graphics.strokePath();
		graphics.setPosition(centerX, centerY);
	}

	drawBox(leftX, topY, width, height, radius) {
		this.graphics.clear();
		this.graphics.fillStyle(this.fillColor, this.fillAlpha);
		this.graphics.fillRoundedRect(leftX, topY, width, height, radius);
		this.graphics.lineStyle(this.lineWidth, this.lineColor, this.lineAlpha);
		this.strokeRoundedRect(leftX, topY, width, height, radius);
	}

	drawBorderlessBox(leftX, topY, width, height, radius) {
		this.graphics.clear();
		this.graphics.fillStyle(this.fillColor, this.fillAlpha);
		this.graphics.fillRoundedRect(leftX, topY, width, height, radius);
	}

	setAlpha(alpha) {
		for (let i = 0; i < this.allGraphics.length; i++) {
			this.allGraphics[i].alpha = alpha;
		}
	}

	addToContainer(container) {
		for (let i = 0; i < this.allGraphics.length; i++) {
			container.add(this.allGraphics[i]);
		}
	}
}

export default GraphicsHelper;