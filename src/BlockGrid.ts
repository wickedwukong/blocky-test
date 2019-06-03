import Block from './Block';

class BlockGrid {
  public readonly grid: Block[][];

  constructor(width = 10, height = 10) {
    this.grid = [];

    for (let x = 0; x < width; x++) {
      const col = [];
      for (let y = 0; y < height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  private width() {
    return this.grid.length;
  }

  private height() {
    return this.grid[0].length;
  }

  render(el = document.getElementById('gridEl')) {
    for (let x = 0; x < this.width(); x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height() - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', (evt) =>
          this.blockClicked(evt, block)
        );
        colEl.appendChild(blockEl);
      }
    }
  }

  blockClicked(e: MouseEvent, block: Block) {
    console.log(e, block);
  }

  connectedBlockOfSameColour(specifiedBlock: Block): Block[] {
    return [specifiedBlock];
  }
}

export default BlockGrid;
