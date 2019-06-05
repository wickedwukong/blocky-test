import BlockGrid from './BlockGrid';
import Position from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
    it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
        const grid = BlockGrid.randomColour(10, 10).grid;

        expect(grid).toHaveLength(10);

        grid.forEach((column) => {
            expect(column).toHaveLength(10);

            column.forEach((block) => {
                expect(block).toBeInstanceOf(Block);
            });
        });

        const gridB = BlockGrid.randomColour(3, 5).grid;

        expect(gridB).toHaveLength(3);

        gridB.forEach((column) => {
            expect(column).toHaveLength(5);
        });
    });

    describe('find affected blocks for a specified block', () => {

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

            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(1);
            expect(affectedBlocks).toContain(specifiedBlock);
        });

        it('find only one block, the specified block itself, when the connected block is of different colour - 2 connected blocks of different colour on the same column', () => {
            let specifiedBlock = new Block(0, 0, 'green');
            const blockGrid = new BlockGrid([[specifiedBlock, new Block(0, 1, 'blue')]]);

            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(1);
            expect(affectedBlocks).toContain(specifiedBlock);
        });

        it('find only one block, the specified block itself, when the connected block is of different colour - 2 connected blocks of different colour on the same column', () => {
            let specifiedBlock = new Block(0, 0, 'green');
            const blockGrid = new BlockGrid([[specifiedBlock, new Block(0, 1, 'blue')]]);

            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(1);
            expect(affectedBlocks).toContain(specifiedBlock);
        });

        it('find 2 affected blocks - 2 blocks on the same row - search left', () => {
            let affectedBlock = new Block(0, 0, 'green');
            let specifiedBlock = new Block(1, 0, 'green');
            const blockGrid = new BlockGrid([[affectedBlock], [specifiedBlock]]);


            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(2);
            expect(affectedBlocks).toContain(specifiedBlock);
            expect(affectedBlocks).toContain(affectedBlock);
        });

        it('find 2 affected blocks - 2 blocks on the same row - search right', () => {
            let specifiedBlock = new Block(0, 0, 'green');
            let affectedBlock = new Block(1, 0, 'green');
            const blockGrid = new BlockGrid([[specifiedBlock], [affectedBlock]]);


            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(2);
            expect(affectedBlocks).toContain(specifiedBlock);
            expect(affectedBlocks).toContain(affectedBlock);
        });

        it('find 3 affected blocks - 3 blocks on the same row - search left', () => {
            let affectedBlock1 = new Block(0, 0, 'green');
            let affectedBlock2 = new Block(1, 0, 'green');
            let specifiedBlock = new Block(2, 0, 'green');

            const blockGrid = new BlockGrid([[affectedBlock1], [affectedBlock2], [specifiedBlock]]);


            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks.length).toBe(3);
            expect(affectedBlocks).toContain(affectedBlock1);
            expect(affectedBlocks).toContain(affectedBlock2);
            expect(affectedBlocks).toContain(specifiedBlock);
        });

        it('find 2 affected blocks - 2 blocks on the same column - search down', () => {
            let specifiedBlock = new Block(0, 1, 'green');
            let affectedBlock = new Block(0, 0, 'green');
            const blockGrid = new BlockGrid([[affectedBlock, specifiedBlock]]);


            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(2);
            expect(affectedBlocks).toContain(specifiedBlock);
            expect(affectedBlocks).toContain(affectedBlock);
        });

        it('find 3 affected blocks - 3 blocks on the same column - search down', () => {
            let specifiedBlock = new Block(0, 2, 'green');
            let affectedBlock1 = new Block(0, 1, 'green');
            let affectedBlock2 = new Block(0, 0, 'green');
            const blockGrid = new BlockGrid([[affectedBlock2, affectedBlock1, specifiedBlock]]);


            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(3);
            expect(affectedBlocks).toContain(specifiedBlock);
            expect(affectedBlocks).toContain(affectedBlock1);
            expect(affectedBlocks).toContain(affectedBlock2);
        });

        it('find 2 affected blocks - 2 blocks on the same column - search up', () => {
            let specifiedBlock = new Block(0, 0, 'green');
            let affectedBlock = new Block(0, 1, 'green');
            const blockGrid = new BlockGrid([[specifiedBlock, affectedBlock]]);


            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(2);
            expect(affectedBlocks).toContain(specifiedBlock);
            expect(affectedBlocks).toContain(affectedBlock);
        });


        it('a more comprehensive test - search left, down, right and up', () => {
            let specifiedBlock = new Block(1, 1, 'green');
            let affectedBlock1 = new Block(0, 1, 'green');
            let affectedBlock2 = new Block(0, 0, 'green');
            let affectedBlock3 = new Block(1, 0, 'green');
            let affectedBlock4 = new Block(1, 2, 'green');
            const blockGrid = new BlockGrid([[affectedBlock2, affectedBlock1, new Block(0, 2, "different-colour")], [affectedBlock3, specifiedBlock, affectedBlock4]]);

            const affectedBlocks = blockGrid.affectedBlocks(specifiedBlock);

            expect(affectedBlocks).toHaveLength(5);
            expect(affectedBlocks).toContain(specifiedBlock);
            expect(affectedBlocks).toContain(affectedBlock1);
            expect(affectedBlocks).toContain(affectedBlock2);
            expect(affectedBlocks).toContain(affectedBlock3);
            expect(affectedBlocks).toContain(affectedBlock4);
        });
    });

    describe('remove affected blocks and replace them with falling blocks', () => {

        it('should be filled with grey when there is no block above - single block grid', () => {
                const blockGrid = new BlockGrid([[new Block(0, 0, "green")]]);
                blockGrid.remove([new Block(0, 0, "green")]);

                expect(blockGrid.grid[0][0]).toEqual(new Block(0, 0, "grey"));
            }
        );

        it('should be filled with color of the block above and the block above should be filled with grey - 2 block grid', () => {
                const blockGrid = new BlockGrid([[new Block(0, 0, "green"), new Block(0, 1, "red")]]);
                blockGrid.remove([new Block(0, 0, "green")]);

                expect(blockGrid.grid[0][0]).toEqual(new Block(0, 0, "red"));
                expect(blockGrid.grid[0][1]).toEqual(new Block(0, 1, "grey"));
            }
        );
    });

});
