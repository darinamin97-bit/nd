import Phaser from 'phaser';

type GameData = { faction: 'JACOBITE' | 'ENGLISH' };

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('Game');
  }

  create(data: GameData) {
    const { width, height } = this.scale;

    // Ground
    const ground = this.add.rectangle(width / 2, height - 20, width, 40, 0x24425b);
    this.physics.add.existing(ground, true);

    // Player
    this.player = this.physics.add.sprite(100, height - 80, undefined as unknown as string);
    this.player.setDisplaySize(24, 32).setTint(data.faction === 'JACOBITE' ? 0x85ff8f : 0xff8f8f);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, ground as unknown as Phaser.GameObjects.GameObject);

    this.cursors = this.input.keyboard!.createCursorKeys();

    // Camera
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    // Simple rightward autoscroll
    this.time.addEvent({
      delay: 16,
      loop: true,
      callback: () => {
        this.cameras.main.scrollX += 2; // fake side-scroll
      }
    });
  }

  override update() {
    const speed = 200;
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body | undefined;
    if (this.cursors.up?.isDown && body && body.blocked.down) {
      this.player.setVelocityY(-400);
    }

    // Fail if fall
    const { height } = this.scale;
    if (this.player.y > height + 50) {
      this.scene.start('GameOver', { score: 0 });
    }
  }
}
