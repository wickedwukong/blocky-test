import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach((column) => {
      expect(column.length).toBe(10);

      column.forEach((block) => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach((column) => {
      expect(column.length).toBe(5);
    });
  });

  describe('find connected blocks of the same colour for a specified block', () => {
    it('find only one block, the specified block itself - one block grid scenario', () => {
      const blockGrid = new BlockGrid(1, 1);
      const specifiedBlock = blockGrid.grid[0][0];

      const connectedBlocks = blockGrid.connectedBlockOfSameColour(specifiedBlock);

      expect(connectedBlocks.length).toBe(1);
      expect(connectedBlocks).toContain(specifiedBlock);
    });

  });
});
