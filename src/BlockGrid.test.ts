import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
    it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
        const grid = BlockGrid.randomColour(10, 10).grid;

        expect(grid.length).toBe(10);

        grid.forEach((column) => {
            expect(column.length).toBe(10);

            column.forEach((block) => {
                expect(block).toBeInstanceOf(Block);
            });
        });

        const gridB = BlockGrid.randomColour(3, 5).grid;

        expect(gridB.length).toBe(3);

        gridB.forEach((column) => {
            expect(column.length).toBe(5);
        });
    });

    describe('find connected blocks of the same colour for a specified block', () => {

        it('should throw Error if injected grid has blocks whose x and y value do not reflect its position in the grid', () => {
                try {
                    new BlockGrid([[new Block(999, 999, 'green')]]);
                    fail("It should have thrown an Error as the x and y values should be 0 and 0, not 999 and 999")
                } catch (e) {
                    expect(e.message).toContain("Invalid grid");
                }
            }
        );


        it('find only one block, the specified block itself - one block', () => {
            let specifiedBlock = new Block(0, 0, 'green');
            const blockGrid = new BlockGrid([[specifiedBlock]]);

            const connectedBlocks = blockGrid.connectedBlockOfSameColour(specifiedBlock);

            expect(connectedBlocks.length).toBe(1);
            expect(connectedBlocks).toContain(specifiedBlock);
        });

        it('find only one block, the specified block itself, when the connected block is of different colour - 2 connected blocks of different colour on the same column', () => {
            let specifiedBlock = new Block(0, 0, 'green');
            const blockGrid = new BlockGrid([[specifiedBlock, new Block(0, 1, 'blue')]]);

            const connectedBlocks = blockGrid.connectedBlockOfSameColour(specifiedBlock);

            expect(connectedBlocks.length).toBe(1);
            expect(connectedBlocks).toContain(specifiedBlock);
        });

        it('find only one block, the specified block itself, when the connected block is of different colour - 2 connected blocks of different colour on the same column', () => {
            let specifiedBlock = new Block(0, 0, 'green');
            const blockGrid = new BlockGrid([[specifiedBlock, new Block(0, 1, 'blue')]]);

            const connectedBlocks = blockGrid.connectedBlockOfSameColour(specifiedBlock);

            expect(connectedBlocks.length).toBe(1);
            expect(connectedBlocks).toContain(specifiedBlock);
        });

        xit('find 2 blocks, 2 connected blocks of same colour on the same row', () => {
          let specifiedBlock = new Block(0, 0, 'green');
          let connectedBlock = new Block(1, 0, 'green');
          const blockGrid = new BlockGrid([[specifiedBlock], [connectedBlock]]);


          const connectedBlocks = blockGrid.connectedBlockOfSameColour(specifiedBlock);

          expect(connectedBlocks.length).toBe(2);
          expect(connectedBlocks).toEqual([specifiedBlock, connectedBlock]);
        });
    });
});
