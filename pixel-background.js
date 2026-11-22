/* Homepage only: bounded, fixed-step pixel simulation without dependencies. */
(() => {
    const canvas = document.querySelector('.pixel-background');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const hero = canvas.closest('.hero');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let width, height, size, columns, blocks = [], shards = [];
    let palette = ['#353535', '#515151', '#777777', '#999999', '#b5b5b5'];
    let last = 0, accumulator = 0, spawnTime = 0, frame = 0, visible = true;
    const random = (a, b) => a + Math.random() * (b - a);
    // Derive the colors from the original artwork when served from the site.
    const artwork = new Image();
    artwork.onload = () => {
        try {
            const sample = document.createElement('canvas');
            sample.width = sample.height = 24;
            const painter = sample.getContext('2d', { willReadFrequently: true });
            painter.drawImage(artwork, 0, 0, 24, 24);
            const data = painter.getImageData(0, 0, 24, 24).data;
            const colors = [];
            for (let i = 0; i < data.length; i += 4) {
                const [r, g, b, a] = data.slice(i, i + 4);
                const light = (r + g + b) / 3;
                if (a > 200 && light > 35 && light < 220) colors.push('rgb(' + r + ',' + g + ',' + b + ')');
            }
            if (colors.length) palette = colors;
        } catch (_) { /* Local-file previews retain the neutral fallback palette. */ }
    };
    artwork.src = 'images/Background.png';
    function block(column, y) {
        return { column, y, velocity: random(25, 70), color: palette[Math.floor(Math.random() * palette.length)] };
    }
    function resize() {
        width = hero.clientWidth; height = hero.clientHeight;
        columns = Math.max(10, Math.round(width / 30));
        size = width / columns;
        const ratio = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        blocks = []; shards = [];
        for (let c = 0; c < columns; c++) {
            const rows = Math.floor(random(1, 4));
            for (let r = 0; r < rows; r++) blocks.push(block(c, height - (r + 1) * size));
        }
        if (!motion.matches) for (let i = 0; i < columns / 3; i++) blocks.push(block(Math.floor(random(0, columns)), random(-height, height * .6)));
        draw();
    }
    function step(dt) {
        spawnTime += dt;
        if (spawnTime > .16) {
            spawnTime = 0;
            const c = Math.floor(random(0, columns));
            const stack = blocks.filter(b => b.column === c);
            // Keep the pile below the copy and bound memory even after hours.
            if (stack.length < Math.max(3, Math.floor(height * .24 / size))) blocks.push(block(c, -size));
        }
        blocks.sort((a, b) => b.y - a.y);
        const floors = new Array(columns).fill(height);
        for (const b of blocks) {
            b.velocity += 480 * dt;
            b.y = Math.min(b.y + b.velocity * dt, floors[b.column] - size);
            if (b.y + size >= floors[b.column] - .01) b.velocity = 0;
            floors[b.column] = b.y;
        }
        shards = shards.filter(p => p.life > 0);
        for (const p of shards) {
            p.life -= dt; p.vy += 600 * dt;
            p.x += p.vx * dt; p.y += p.vy * dt;
        }
    }
    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (const b of blocks) {
            const x = b.column * size;
            ctx.globalAlpha = .7; ctx.fillStyle = b.color;
            ctx.fillRect(Math.round(x + 1), Math.round(b.y + 1), Math.ceil(size - 2), Math.ceil(size - 2));
            ctx.globalAlpha = .16; ctx.fillStyle = '#fff';
            ctx.fillRect(Math.round(x + 2), Math.round(b.y + 2), Math.ceil(size - 4), 2);
        }
        for (const p of shards) {
            ctx.globalAlpha = Math.max(0, p.life / .8); ctx.fillStyle = p.color;
            ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        }
        ctx.globalAlpha = 1;
    }
    function tick(time) {
        const elapsed = last ? Math.min((time - last) / 1000, .05) : 0;
        last = time; accumulator += elapsed;
        while (accumulator >= 1 / 60) { step(1 / 60); accumulator -= 1 / 60; }
        draw(); frame = requestAnimationFrame(tick);
    }
    function playback() {
        cancelAnimationFrame(frame); last = 0; accumulator = 0;
        if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
        else draw();
    }
    hero.addEventListener('click', event => {
        if (event.target.closest('a, button, input')) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left, y = event.clientY - rect.top;
        const index = blocks.findIndex(b => Math.floor(x / size) === b.column && y >= b.y && y <= b.y + size);
        if (index < 0) return;
        const b = blocks.splice(index, 1)[0];
        if (!motion.matches) {
            shards = shards.slice(-240);
            for (let i = 0; i < 16; i++) shards.push({
                x: b.column * size + (i % 4) * size / 4, y: b.y + Math.floor(i / 4) * size / 4,
                vx: random(-180, 180), vy: random(-280, -60), life: .8, size: Math.max(2, size / 4 - 1), color: b.color
            });
        } else {
            // Settle immediately without animation for reduced-motion users.
            blocks.sort((a, b) => b.y - a.y);
            let floor = height;
            for (const item of blocks.filter(item => item.column === b.column)) {
                item.y = floor - size; floor = item.y;
            }
        }
        draw();
    });
    new ResizeObserver(resize).observe(hero);
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; playback(); }).observe(hero);
    document.addEventListener('visibilitychange', playback);
    motion.addEventListener('change', () => { resize(); playback(); });
    resize(); playback();
})();
