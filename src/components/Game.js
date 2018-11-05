import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StartGameForm from './StartGameForm';
import Editor, {GET_QUEST} from './Editor';
import Monitor from './Monitor';
import Paper from '@material-ui/core/Paper';
import {Query, Mutation, Subscription} from 'react-apollo';
import gql from 'graphql-tag';

import 'prismjs/themes/prism-tomorrow.css';

export const SUBSCRIBE_GAME = gql`
    subscription {
        gameChanged {
            desc
            code
            tests
            questId
            player1 {
                code
                errors
                errorLine
                testScore
                testScoreOf
                order
                name
                veteran
                ready
                testsResults {
                    passed
                    received
                }
            }
            player2 {
                code
                errors
                errorLine
                testScore
                testScoreOf
                order
                name
                veteran
                ready
                testsResults {
                    passed
                    received
                }
            }
        }
    }
`;

export const UPDATE_GAME = gql`
    mutation($path: String!, $value: String, $boolValue: Boolean) {
        updateGame(path: $path, value: $value, boolValue: $boolValue) {
            desc
            code
            tests
            questId
            player1 {
                code
                errors
                errorLine
                testScore
                testScoreOf
                order
                name
                veteran
                ready
                testsResults {
                    passed
                    received
                }
            }
            player2 {
                code
                errors
                errorLine
                testScore
                testScoreOf
                order
                name
                veteran
                ready
                testsResults {
                    passed
                    received
                }
            }
        }
    }
`;

class Game extends React.Component {
    confetti = enabled => {
        const canvas = document.getElementById('confetti');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        canvas.width = windowWidth;
        canvas.height = windowHeight;

        if (!enabled) {
            if (this.confettiInterval) {
                clearInterval(this.confettiInterval);
                this.confettiInterval = null;
            }
            window.requestAnimationFrame(() => {
                ctx.clearRect(0, 0, windowWidth, windowHeight);
            });
            return;
        }

        if (this.confettiInterval) {
            return;
        }

        const maxCount = 150;
        const types = ['circle', 'circle', 'triangle', 'triangle', 'line'];
        const colors = [
            [238, 96, 169],
            [68, 213, 217],
            [245, 187, 152],
            [144, 148, 188],
            [235, 234, 77],
        ];
        const particles = [];
        const newParticle = forceParams => ({
            x: Math.random() * windowWidth, // x-coordinate
            y: Math.random() * windowHeight, // y-coordinate
            radius: Math.random() * 4 + 1, // radius
            depth: Math.random() * maxCount, // depth
            color: colors[Math.floor(Math.random() * colors.length)], // color
            type: types[Math.floor(Math.random() * types.length)], // shape
            rotationDeg: Math.floor(Math.random() * 360),
            rotationSpeed: Math.ceil(Math.random() * 3),
            rotationDirection: [+1, -1][Math.floor(Math.random() * 2)],
            ...forceParams,
        });
        const newCat = () => {
            let x;
            let y;
            if (Math.random() > 0.5) {
                x = Math.random() > 0.5 ? -100 : windowWidth + 100;
                y = Math.random() * windowHeight;
            } else {
                x = Math.random() * windowWidth;
                y = Math.random() > 0.5 ? -100 : windowHeight + 100;
            }
            const targetX = Math.random() * (windowWidth / 2) + windowWidth / 4;
            const targetY = Math.random() * (windowHeight / 2) + windowHeight / 4;

            return {
                width: 200,
                height: 140,
                startX: x,
                startY: y,
                x,
                y,
                angle: rad2deg(Math.atan2(targetY - y, targetX - x)),
                speed: 10,
                frameCount: 6,
                frameCurrent: 0,
                lastFrame: 0,
            };
        };
        let cat = newCat();
        let catImage = null;
        loadImage('./static/nyan-cat.png').then(image => (catImage = image));

        // create new particles
        for (let i = 0; i < maxCount; i++) {
            particles.push(newParticle());
        }

        function draw() {
            window.requestAnimationFrame(() => {
                ctx.clearRect(0, 0, windowWidth, windowHeight);
                for (let i = 0; i < maxCount; i++) {
                    const p = particles[i];
                    const op = p.radius <= 3 ? 0.4 : 0.8;

                    // nyan cat
                    if (catImage) {
                        ctx.save();
                        ctx.translate(cat.x, cat.y);
                        ctx.rotate(deg2rad(cat.angle));
                        ctx.translate(-cat.x, -cat.y);

                        ctx.drawImage(
                            catImage,
                            cat.frameCurrent * cat.width,
                            0,
                            cat.width,
                            cat.height,
                            cat.x,
                            cat.y,
                            cat.width,
                            cat.height
                        );

                        ctx.restore();
                    }

                    // rotation (skip for circles)
                    if (p.type !== 'circle') {
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate(deg2rad(p.rotationDeg));
                        ctx.translate(-p.x, -p.y);
                    }

                    if (p.type === 'circle') {
                        ctx.fillStyle = 'rgba(' + p.color + ', ' + op + ')';
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
                        ctx.fill();
                    } else if (p.type === 'triangle') {
                        ctx.fillStyle = 'rgba(' + p.color + ', ' + op + ')';
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y - p.radius * 1.6);
                        ctx.lineTo(p.x + p.radius * 1.8, p.y + p.radius * 1.6);
                        ctx.lineTo(p.x - p.radius * 1.8, p.y + p.radius * 1.6);
                        ctx.closePath();
                        ctx.fill();
                    } else if (p.type === 'line') {
                        ctx.strokeStyle = 'rgba(' + p.color + ',' + op + ')';
                        ctx.beginPath();
                        ctx.moveTo(p.x - p.radius * 5 / 2, p.y);
                        ctx.lineTo(p.x + p.radius * 5 / 2, p.y);
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }

                    if (p.type !== 'circle') {
                        ctx.restore();
                    }
                }
                update();
            });
        }

        function update() {
            // move the cat only if we passed certain time since the last frame
            if (cat.lastFrame < Date.now() - 50) {
                cat.frameCurrent = (cat.frameCurrent + 1) % cat.frameCount;
                cat.lastFrame = Date.now();
                cat.x +=
                    Math.cos(deg2rad(cat.angle)) *
                    cat.speed *
                    (cat.startX === windowWidth ? -1 : +1);
                cat.y +=
                    Math.sin(deg2rad(cat.angle)) *
                    cat.speed *
                    (cat.startY === windowHeight ? -1 : +1);

                // generate a new cat if the border of the screen is reached
                if (
                    cat.x < -150 ||
                    windowWidth + 150 < cat.x ||
                    cat.y < -150 ||
                    windowHeight + 150 < cat.y
                ) {
                    cat = newCat();
                }
            }

            for (let i = 0; i < maxCount; i++) {
                const p = particles[i];
                p.y += Math.cos(p.depth) + 1 + p.radius / 2;
                p.x += Math.sin(0) * 2;
                p.rotationDeg += p.rotationSpeed * p.rotationDirection;

                if (p.x > windowWidth + 5 || p.x < -5 || p.y > windowHeight) {
                    particles[i] = newParticle({y: -10});
                }
            }
        }

        // animation loop
        this.confettiInterval = setInterval(draw, 23);
    };

    render() {
        const {mode, type, id} = this.props;

        const getPlaygrounds = data => {
            let playground1, playground2, title;
            const {code, tests, player1, player2} = data.gameChanged;
            const testScore1 = Math.round(player1.testScore / player1.testScoreOf * 100);
            const testScore2 = Math.round(player2.testScore / player2.testScoreOf * 100);
            if (mode === '/player1') {
                if (!player1.ready) {
                    playground1 = (
                        <Mutation mutation={UPDATE_GAME}>
                            {(updateGame, {data}) => (
                                <StartGameForm
                                    onDone={({name, email, veteran}) => {
                                        updateGame({
                                            variables: {
                                                path: 'player1.ready',
                                                boolValue: true,
                                            },
                                        });
                                        updateGame({
                                            variables: {
                                                path: 'player1.name',
                                                value: name,
                                            },
                                        });
                                        updateGame({
                                            variables: {
                                                path: 'player1.veteran',
                                                boolValue: veteran,
                                            },
                                        });
                                        updateGame({
                                            variables: {
                                                path: 'player1.email',
                                                value: email,
                                            },
                                        });
                                    }}
                                />
                            )}
                        </Mutation>
                    );

                    playground2 = '';
                    title = (
                        <h1>
                            Code &amp; Beer<span className="caret-blinking">_</span>
                        </h1>
                    );
                } else if (!player2.ready) {
                    playground1 = (
                        <div className="game-status">
                            <img src="./static/puff.svg" width="50" />Waiting for player two
                        </div>
                    );
                    title = (
                        <h1>
                            Code &amp; Beer<span className="caret-blinking">_</span>
                        </h1>
                    );
                } else {
                    playground1 = (
                        <div className="player" id="player1">
                            <Editor
                                id="1"
                                player={`${player1.name || 'Player 1 (you)'}`}
                                code={player1.code}
                                order={player1.order}
                                originalCode={data.gameChanged.code}
                                tests={tests}
                                testsResults={player1.testsResults}
                                testScore={testScore1}
                                errors={player1.errors}
                            />
                        </div>
                    );
                    playground2 = (
                        <div className="player" id="player2">
                            <Monitor
                                code={player2.code}
                                order={player2.order}
                                player={`${player2.name || 'Player 2'}`}
                                tests={tests}
                                testsResults={player2.testsResults}
                                testScore={testScore2}
                                errors={player2.errors}
                            />
                        </div>
                    );
                    title = <h2>Fix all Tests</h2>;
                }
            } else if (mode === '/player2') {
                if (!player2.ready) {
                    playground1 = (
                        <Mutation mutation={UPDATE_GAME}>
                            {(updateGame, {data}) => (
                                <StartGameForm
                                    onDone={({name, email, veteran}) => {
                                        updateGame({
                                            variables: {
                                                path: 'player2.ready',
                                                boolValue: true,
                                            },
                                        });
                                        updateGame({
                                            variables: {
                                                path: 'player2.name',
                                                value: name,
                                            },
                                        });
                                        updateGame({
                                            variables: {
                                                path: 'player2.email',
                                                value: email,
                                            },
                                        });
                                        updateGame({
                                            variables: {
                                                path: 'player2.veteran',
                                                boolValue: veteran,
                                            },
                                        });
                                    }}
                                />
                            )}
                        </Mutation>
                    );
                    playground2 = '';
                    title = (
                        <h1>
                            Code &amp; Beer<span className="caret-blinking">_</span>
                        </h1>
                    );
                } else if (!player1.ready) {
                    playground1 = (
                        <div className="game-status">
                            <img src="./static/puff.svg" width="50" />Waiting for player one
                        </div>
                    );
                    title = (
                        <h1>
                            Code &amp; Beer<span className="caret-blinking">_</span>
                        </h1>
                    );
                } else {
                    playground1 = (
                        <div className="player" id="player1">
                            <Monitor
                                key={code}
                                player={`${player1.name || 'Player 1'}`}
                                code={player1.code}
                                order={player1.order}
                                tests={tests}
                                testsResults={player1.testsResults}
                                testScore={testScore1}
                                errors={player1.errors}
                            />
                        </div>
                    );
                    playground2 = (
                        <div className="player" id="player2">
                            <Editor
                                id="2"
                                key={code}
                                player={`${player2.name || 'Player 2 (you)'}`}
                                code={player2.code}
                                order={player2.order}
                                originalCode={data.gameChanged.code}
                                tests={tests}
                                testsResults={player2.testsResults}
                                testScore={testScore2}
                                errors={player2.errors}
                            />
                        </div>
                    );
                    title = <h2>Fix all Tests</h2>;
                }
            } else {
                if (!player1.ready && !player2.ready) {
                    playground1 = (
                        <div className="game-status">
                            <img src="./static/puff.svg" width="50" />Waiting for players
                        </div>
                    );
                    title = (
                        <h1>
                            Code &amp; Beer<span className="caret-blinking">_</span>
                        </h1>
                    );
                } else if (!player1.ready) {
                    playground1 = (
                        <div className="game-status">
                            <img src="./static/puff.svg" width="50" />Waiting for player one
                        </div>
                    );
                    title = (
                        <h1>
                            Code &amp; Beer<span className="caret-blinking">_</span>
                        </h1>
                    );
                } else if (!player2.ready) {
                    playground1 = (
                        <div className="game-status">
                            <img src="./static/puff.svg" width="50" />Waiting for player two
                        </div>
                    );
                    title = (
                        <h1>
                            Code &amp; Beer<span className="caret-blinking">_</span>
                        </h1>
                    );
                } else {
                    playground1 = (
                        <div className="player" id="player1">
                            <Monitor
                                key={code}
                                player={`${player1.name || 'Player 1'}`}
                                code={player1.code}
                                order={player1.order}
                                tests={tests}
                                testsResults={player1.testsResults}
                                testScore={testScore1}
                                errors={player1.errors}
                            />
                        </div>
                    );
                    playground2 = (
                        <div className="player" id="player2">
                            <Monitor
                                key={code}
                                player={`${player2.name || 'Player 2'}`}
                                code={player2.code}
                                order={player2.order}
                                tests={tests}
                                testsResults={player2.testsResults}
                                testScore={testScore2}
                                errors={player2.errors}
                            />
                        </div>
                    );
                    title = <h2>Fix all tests</h2>;
                }
            }
            return {
                playground1,
                playground2,
                title,
                veteran:
                    (mode === '/player1' && player1.veteran) ||
                    (mode === '/player2' && player2.veteran),
                confetti: player1.order == 1 || player2.order == 1,
            };
        };

        return (
            <Subscription subscription={SUBSCRIBE_GAME}>
                {({data, loading, error}) => {
                    let Content, veteran;

                    if (error) {
                        return (
                            <div className="game-status">
                                <img src="./static/puff.svg" width="50" />
                                {error.message}
                            </div>
                        );
                    } else if (loading) {
                        return (
                            <div className="game-status">
                                <img src="./static/puff.svg" width="50" />Loading
                            </div>
                        );
                    } else {
                        if (!data) return 'No habe data';

                        const {
                            playground1,
                            playground2,
                            veteran: veteranOn,
                            confetti: confettiOn,
                            title,
                        } = getPlaygrounds(data);

                        this.confetti(confettiOn);

                        return (
                            <div className={'game ' + type + (veteranOn ? ' veteran' : '')} id={id}>
                                <div className="terminal__flicker" />
                                <div className="terminal">
                                    <canvas id="confetti" />
                                    <div className="terminal__content">
                                        {mode === '/monitor' && (
                                            <div className="header">
                                                <div className="logo__container">
                                                    <svg
                                                        viewBox="0 0 329.22 84.64"
                                                        className="logo"
                                                    >
                                                        <path d="M42.32 0a42.32 42.32 0 1 0 42.32 42.32A42.32 42.32 0 0 0 42.32 0zm0 76.9A34.58 34.58 0 1 1 76.9 42.32 34.58 34.58 0 0 1 42.32 76.9z" />
                                                        <circle cx="39.86" cy="21" r="4.67" />
                                                        <path d="M43.77 29.17a2.6 2.6 0 1 0 2.6 2.6 2.6 2.6 0 0 0-2.6-2.6z" />
                                                        <circle cx="31.87" cy="32.65" r="4.13" />
                                                        <path d="M124.08 20.74v7.59a28.58 28.58 0 0 0-11.82-2.88c-7.79 0-9.52 2.88-9.52 6.15 0 7.69 24.51 3.27 24.51 21.33 0 6.63-4.71 14.13-17.88 14.13a28.74 28.74 0 0 1-13.83-3.36v-8A26.82 26.82 0 0 0 109 59.28c6.53 0 9.42-2.79 9.42-6 0-10.76-24.41-4.9-24.41-21.43 0-6.92 4.52-14.32 17.2-14.32a29 29 0 0 1 12.87 3.21zM176.46 37.66V51.5c0 3.65-1.44 15.57-19.9 15.57-18.84 0-20.28-12.11-20.28-15.86 0-9.52 8.46-15.19 22.59-15.19a63.61 63.61 0 0 1 8.74.58c-.38-7.88-3.84-11.34-13.26-11.34a40.86 40.86 0 0 0-13.26 2.4v-7.5a40.41 40.41 0 0 1 14.51-2.6c13.4.01 20.86 7.12 20.86 20.1zm-8.84 6a52.63 52.63 0 0 0-8.36-.58C155.12 43 145 44.29 145 51.11c0 5.48 3.94 8.17 11.53 8.17 7.31 0 11.05-2.59 11.05-7.88v-7.78zM204.92 67.07a36.24 36.24 0 0 1-10.19-1.44v18.93h-8.84V33c0-3.65 1.44-15.48 19.89-15.48 7.88 0 21.24 3.27 21.24 25.27-.02 20.05-12.02 24.28-22.1 24.28zm.87-41.81c-7.31 0-11.05 2.4-11.05 7.21v24.8a28.23 28.23 0 0 0 10.19 1.92c6.92 0 13.26-1.92 13.26-16.34 0-15.57-6.64-17.59-12.4-17.59zM275.77 38v28.3h-8.84V37.76c0-10.48-5.77-11.73-10.76-11.73a33.49 33.49 0 0 0-11.82 2.31v38h-8.85V.08h8.84V20A35.05 35.05 0 0 1 257 17.57c12 0 18.77 7.43 18.77 20.43zM329.22 42.37c0 20.37-12.3 24.7-22.58 24.7S284 62.74 284 42.37s12.3-24.7 22.59-24.7 22.63 4.33 22.63 24.7zm-8.84 0c0-14.9-6.54-16.92-13.74-16.92s-13.75 2-13.75 16.92 6.54 16.91 13.75 16.91 13.74-2.01 13.74-16.91z" />
                                                        <path d="M71.54 44.56a15.75 15.75 0 0 0-2-2c-6.89-5.72-18.06-5.73-24.94 0s-18.05 5.73-24.94 0a13.61 13.61 0 0 1-5.11-9.46 29.31 29.31 0 1 0 56.99 11.46z" />
                                                    </svg>
                                                </div>
                                                <h1 className="headline--index">
                                                    Code &amp; Beer<span className="caret-blinking">_</span>
                                                </h1>
                                            </div>
                                        )}

                                        <div
                                            style={{
                                                width: 100 + '%',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 100 + '%',
                                                }}
                                            >
                                                {mode !== '/monitor' && title}
                                                <div className="players">
                                                    {playground1}
                                                    {playground2}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <footer>2018 &copy; Sapho Inc.</footer>
                                </div>
                            </div>
                        );
                    }
                }}
            </Subscription>
        );
    }
}

const loadImage = src =>
    new Promise(resolve => {
        const img = new Image();
        img.onload = function() {
            resolve(img);
        };
        img.src = src;
    });
const deg2rad = deg => (deg * Math.PI) / 180;
const rad2deg = rad => (rad * 180) / Math.PI;

export default Game;
