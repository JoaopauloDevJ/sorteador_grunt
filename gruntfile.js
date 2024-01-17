module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development:{
                files:{
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production:{
                options:{
                    compress: true,
                },
                files:{
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'../src/scripts/main.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.min.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'../scripts/main.min.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:{          // minificar o HTML
            dist:{
                options:{
                    removeComments:true,
                    collapseWhitespace: true
                },
                files:{
                    'prebuild/index.html':'src/index.html'
                }
            }
        },
        clean:['prebuild'],    //apagar pasta de arquivo automaticamente
        uglify:{
            target:{
                files: {
                    'dist/scripts/main.min.js':'src/scripts/main.js'
                }
            }
        }
    
    })

    //carregando plugin do grunt
    grunt.loadNpmTasks('grunt-contrib-less');       //plugin para compilar o LESS
    grunt.loadNpmTasks('grunt-contrib-watch');      //plugin para monitora automaticamente arquivos editados
    grunt.loadNpmTasks('grunt-replace');            //plugin para Substituir texto em arquivos usando strings, regexs ou funções
    grunt.loadNpmTasks('grunt-contrib-htmlmin');    //plugin para minificar o HTML
    grunt.loadNpmTasks('grunt-contrib-clean');      //plugin para limpar arquivos e pastas
    grunt.loadNpmTasks('grunt-contrib-uglify');     //plugin para comprimir javascript

    grunt.registerTask('default',['watch']);
    grunt.registerTask('build',['less:production', 'htmlmin:dist', 'replace:dist','clean','uglify']);
    
}

