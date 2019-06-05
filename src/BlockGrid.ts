import Block from './Block';


class BlockGrid {
    public readonly grid: Block[][];

    constructor(grid: Block[][]) {
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                if (grid[x][y].x != x || grid[x][y].y != y) {
                    throw new Error(`Invalid grid. Block's x and y value are not valid.\n`
                        + `They should reflect its position in the grid.\n`
                        + `Block at position ${x} ${y} has x: ${grid[x][y].x} and y: ${grid[x][y].y}`)
                }
            }
        }
        this.grid = grid;
    }

    static randomColour(width = 10, height = 10): BlockGrid {
        const grid = [];

        for (let x = 0; x < width; x++) {
            const col = [];
            for (let y = 0; y < height; y++) {
                col.push(new Block(x, y));
            }

            grid.push(col);
        }

        return new this(grid);
    }

    private width(): number {
        return this.grid.length;
    }

    private height(): number {
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

    private leftAffectedBlock(specifiedBlock: Block): Block | null {
        if (specifiedBlock.x == 0) return null;
        const leftBlock = this.grid[specifiedBlock.x - 1][specifiedBlock.y];
        return (leftBlock.colour === specifiedBlock.colour) ? leftBlock : null;
    }

    private belowAffectedBlock(specifiedBlock: Block): Block | null {
        if (specifiedBlock.y == 0) return null;
        const belowBlock = this.grid[specifiedBlock.x][specifiedBlock.y - 1];
        return (belowBlock.colour === specifiedBlock.colour) ? belowBlock : null;
    }

    private helper(specifiedBlock: Block, affectedBlocks: Block[]): Block[] {
        function specifiedBlockHadBeenTraversed() {
            return affectedBlocks.indexOf(specifiedBlock) > -1;
        }

        if (specifiedBlockHadBeenTraversed()) return affectedBlocks;

        affectedBlocks.push(specifiedBlock);

        const leftAffectedBlock: Block = this.leftAffectedBlock(specifiedBlock);

        if (leftAffectedBlock !== null) {
            this.helper(leftAffectedBlock, affectedBlocks);
        }

        const belowAffectedBlock: Block = this.belowAffectedBlock(specifiedBlock);

        if (belowAffectedBlock !== null) {
            this.helper(belowAffectedBlock, affectedBlocks);
        }


        return affectedBlocks;
    }

    affectedBlocks(specifiedBlock: Block): Block[] {
        return this.helper(specifiedBlock, [])
    }
}

export default BlockGrid;
