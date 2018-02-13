module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
	 	pkg: grunt.file.readJSON('package.json'),

	 	/*SASS*/
	 	sass: {
	 		dist:{
	 			options:{
	 				style: 'compressed',
	 				sourcemap: 'none',				//Genererar en extra fil om man inte har none
	 				precision:2,
	 				update:true
	 			},
	 			files:{
	 				//målfil : källfil
	 				'css/style.css'	: 'src/scss/style.scss'				
	 			}
	 		}
	 	},
	 	/* POST CSS */
	 	postcss:{
	 		options: {
	 			map: false,    //Ingen sourcemap
	 			processors:[
	 			require('autoprefixer')({browsers: 'last 2 versions'}),
	 			require('cssnano')()
	 			]
	 		},
	 		dist: {
	 			src: 'css/*.css'
	 		}

	 	},

	 	/*JSCS*/

	 	jscs: {
	 		src: 'src/js/*.js',
	 		options: {
	 			'preset': 'google'
	 		}
	 	},
	 	/*UGLIFY*/
	 	uglify: {
	 		options:{
	 			beautify: false,		//Gör att det inte blir en kompakt fil????  se github.com/gruntjs/grunt-contrib-uglify
	 			preserveComments: false,
	 			quoteStyle: 1,			//gör om dubbla citattecken till enkla citattecken
	 			compress: {
	 				drop_console:true    //Tar bort alla console.log rader
	 			}
	 		}, 
	 		build: {
	 			files: [{
	 				expand: true,
	 				src: 'src/js/build/*.js',   // alla filer i js-mappen läggs ihop i file build 
	 				dest: 'js/',
	 				flatten: true,
	 				rename: function(destBase, destPath){      //alla minimerade filer får namnet min.js
 						return destBase+ destPath.replace('.js', '.min.js');
	 				}
	 			}]
	 		}
	 	},

	 	/*CONCAT, slår ihop fler filer*/		//se github.com/gruntjs/grunt-contrib-concat
	 	concat: {
	 		options: {
	 			separator: '\n'
	 		},
	 			dist: {
	 				src: ['src/js/main.js', 'src/js/mobile.js'],
	 				dest: 'src/js/build/scripts.js'
	 				}
	 	},

	 	/*Watch */
	 		watch:{
	 			css:{
	 				files: ['**/*.scss'],
	 				tasks:['sass', 'postcss'/*, 'notify:sass'*/]
	 			},
	 			js:{
	 				files: ['src/js/*.js'],
	 				tasks:['jscs','concat', 'uglify'/*,'notify:uglify'*/]			//uppgifter som ska utföras
	 			},
	 			options:{
	 				nospawn: true
	 			}
	 		}
	});
	grunt.registerTask('default', ['watch']);
}