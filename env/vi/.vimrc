syntax on

"==============================================================================
"
"   基本動作
"
"------------------------------------------------------------------------------

"<< 互換設定 >>
"-- set nocompatible    " vi非互換(vim独自拡張機能を使う)(.vimrc読み込み時に自動でなるので指定不要)

"<< カレントディレクトリ >>
"   ファイルを開くたびに、そのファイルのディレクトリをカレントディレクトリにする？？？
"-- :autocmd BufEnter * execute ":lcd " . expand("%:p:h")       " エラーになる

"<< ビープ音 >>
"-- set vb t_vb=        " ビープ音を鳴らさない


"==============================================================================
"
"   表示設定
"
"------------------------------------------------------------------------------

"<< カラースキーマ >>
"-- colorscheme darkblue
    colorscheme desert
"-- colorscheme evening

"<< タブ文字 >>
    set tabstop=4
    set shiftwidth=4
    set softtabstop=0
    set noexpandtab

"<< 制御コード >>
"       tab   : TAB
"       trail : 行末の空白
"       eol   : 改行コード
    set lcs=tab:~_,trail:_,eol:$    " 制御コード部分の代替表示文字
    set list                        " 制御コードを表示

"<< フォント >>
"   フォント名がわからないときは、以下の手順で調べる
"       (1) フォントパネルでフォントを変更する
"       (2) :options でオプション情報を表示する
"       (3) /guifont で検索して、そこに記述されているフォント名をコピーする
"-- set guifont=Menlo\ Regular:h14
"-- set guifont=Courier:h14
if has('mac')
    set encoding=utf-8
    set guifont=Courier:h12     " linespaceを設定すれば14ptじゃなくても見やすくなる
elseif has('win32')
    set encoding=sjis
    set guifont=Terminal:h10:cSHIFTJIS
else
"   set guifont=DejaVu\ Sans\ Mono\ 9
    set guifont=Liberation\ Mono\ 9
endif

"<< ウィンドウ >>
"   :echo has('key') で現在の環境を確認可能 0:無効/1:有効
"       gui_macvim
if has('gui')
    set nowrap              " 折り返し無し
    set columns=120         " 列
    set lines=52            " 行(ステータス行とコマンド行の分を＋２)
"   set linespace=1         " 行間の隙間(デフォルトは０)
    set showtabline=2       " (GUI)ウィンドウタブを常時表示にする
    set guioptions-=T       " (GUI)ツールバーを非表示にする
"-- set transparency=30     " 透明度の指定(残像が酷いので使わない)
else
    set wrap                " 折り返し表示
    set columns=80          " 列
    set lines=27            " 行(ステータス行とコマンド行の分を＋２)
endif

"<< スケール >>
    set number          " 行番号の表示
"-- set ruler           " ルーラーを表示する（statuslineを指定したら意味ない？）

"<< ステータス >>
    set laststatus=2    " ステータス行を常に表示
    set showcmd         " 入力中のコマンドを表示する
    set showmode        " モードを表示する（デフォルトゆえに指定不要？）

"<< ステータス行の書式カスタマイズ >>
"       設定値を表示するためには「%{&設定名}」
"-- set statusline=%F%m%r%h%w\ [Format=%{&ff}]\ [Type=%Y]\ [Ascii=\%03.3b]\ [Hex=\%02.2B]\ [Pos=%04l,%04v][%p%%]\ [Len=%L]
"-- set statusline=0x\%04.4B<\%05.5b>\ (%03v,%05l/%05L=%03p%%)\ %F%m%r%h%w\ [%{&ff}(%Y)]
"-- set statusline=\ 0x\%04.4B=\%05.5b\ %03v,%05l/%05L\ %{&ff}%y\ %m%r%h%w
"-- set statusline=\ 0x\%04.4B=\%05.5b\ %03v,%05l/%05L\ %{&fileformat}%y\ %{&fileencoding==''?&encoding:&fileencoding}\ %m%r%h%w
"-- set statusline=\ 0x\%04.4B=\%05.5b\ %03v,%05l/%05L\ %{&ff}%y\ %{&fenc==''?&enc:&fenc}\ %m%r%h%w
    set statusline=\ 0x\%04.4B=\%05.5b\ %03v,%05l/%05L\ %{&ff}%y\ %{&enc}(%{&fenc})\ %m%r%h%w


"==============================================================================
"
"   入力補助
"
"------------------------------------------------------------------------------

"<< オートインデント >>
    set autoindent

"<< IMモード >>
"-- set imdisable   " ノーマルモードでのIMを無効にする（でも、何か変になる・・・てか、機能してるかわからん）

"<< クリップボード >>
    set clipboard+=unnamed  " 無名レジスタの内容をクリップボードレジスタ(*)へ追加する

"<< バックスペース制御 >>
"       indent : 行頭の空白
"       eol    : 改行
"       start  : 挿入モード開始位置より手前の文字
"-- set backspace=indent,eol,start      " バックスペースキーで削除可能なもの


"==============================================================================
"
"   ファイル関連の指定
"
"------------------------------------------------------------------------------

"<< 文字コード >>
    set fileencodings=ucs-bom,utf-8,iso-2022-jp,euc-jp,shift-jis,default,latin1
"-- set fileencoding=euc-jp
"-- set fileencoding=shift_jis
"-- set fileencoding=utf-8

"<< 改行コード >>
    set fileformats=unix,dos,mac    " 自動認識
"-- set fileformat=dos      " MS-DOS(Windows/OS2)
"-- set fileformat=mac      " Macintosh
"-- set fileformat=unix     " Unix/Linux


"==============================================================================
"
"   バックアップ
"
"------------------------------------------------------------------------------

"<< ディレクトリ >>
"-- set backupdir=~/backup  " バックアップ先
"-- set directory=~/swap    " スワップ先

"<< バックアップ >>
"-- set nobackup            " 自動バックアップしない
"-- set writebackup         " 上書き前にバックアップする(ただし、nobackupの場合は上書き成功後に削除される)


"==============================================================================
"
"   キーバインド
"
"------------------------------------------------------------------------------

"   <A-?> : Alter   with ?key       | Up    | ESC   | BS / Del
"   <C-?> : Control with ?key       | Down  | Tab   | Space
"   <D-?> : Command with ?key       | Left  |       | Return / CR
"   <S-?> : Shift   with ?key       | Right |       | 
"   <M-?> : ??????? with ?key       |       |       | 

"<< ノーマルモード >>
    nmap    <C-Space><C-Space>      :vi ~/.vimrc
    nmap    <C-Space><C-v>          :vi ~/.vimrc<CR>
    nmap    <C-Space><C-r>          :source %<CR>
    nmap    <C-Space><C-e>          :E<CR>
    nmap    <C-Space><C-s>          :w<CR>
    nmap    <C-Space><C-l>          :call Toggle_ListMode()<CR>
    nmap    <C-Space><C-w>          :call Toggle_WindowWidth()<CR>
    nmap    <C-Space><C-f>          :call Toggle_FontSize()<CR>
    nmap    <C-Space><C-o>          :call Open_ThisFile()<CR>
    nmap    <C-Space><C-y>          :!say @0<CR>
    nmap    <C-Space><C-h>          :call Toggle_RowHight()<CR>
    nmap    <C-Space><C-Return>     :call Toggle_WrapMode()<CR>
    nmap    <C-Space>0              :colorscheme darkblue<CR>
    nmap    <C-Space>1              :colorscheme desert<CR>
    nmap    <C-Space>2              :colorscheme koehler<CR>
    nmap    <C-Space>3              :colorscheme morning<CR>
    nmap    <C-Space>4              :colorscheme murphy<CR>
    nmap    <C-Space>5              :colorscheme ron<CR>
    nmap    <C-Space>6              :colorscheme slate<CR>
    nmap    <C-Space>7              :colorscheme torte<CR>
    nmap    <A-Space>               i<Space><ESC><Right>
    nmap    <A-Tab>                 i<Tab><ESC><Right>
    nmap    <A-BS>                  <Left>x
    nmap    <A-Return>              O<ESC>
    nmap    ma                      @a
    nmap    ms                      @s
    nmap    mt                      zt
    nmap    mh                      ^
    nmap    mm                      zz
    nmap    mb                      zb
    nmap    ml                      $
    nmap    gt                      zt
    nmap    gh                      0
    nmap    gm                      zz
    nmap    gb                      zb
    nmap    gl                      $
    nmap    ti                      i<Tab><ESC><Right>
    nmap    ts                      :set expandtab\|retab\|set noexpandtab
    nmap    t2                      :set tabstop=2 shiftwidth=2 softtabstop=0
    nmap    t4                      :set tabstop=4 shiftwidth=4 softtabstop=0
    nmap    t8                      :set tabstop=8 shiftwidth=8 softtabstop=0
    nmap    tt                      :call Toggle_ListMode()<CR>
    nmap    co                      :call ComentOut()<CR>
    nmap    cl                      :set cursorline<CR>
"   nmap    <Space>                 10<Down>
"   nmap    <S-Space>               10<Up>
"   nmap    <S-Return>              5<down>
"   nmap    <C-Return>              <C-f>
    nmap    <Tab>                   w
    nmap    <S-Tab>                 b

"<< 入力モード >>
    imap    <C-h>                   <Left>
    imap    <C-j>                   <Down>
    imap    <C-k>                   <Up>
    imap    <C-l>                   <Right>
    imap    <C-0>                   <esc>i
    imap    <C-;>                   <Esc>A
    imap    <C-@><C-h>              <Esc>I
    imap    <C-@><C-m>              <Esc>zza
    imap    <C-@><C-l>              <Esc>A
    imap    <C-@><C-s>              <Esc>:w<CR>a
    imap    <C-@><C-@>              <Esc>
"   imap    <A-Space>               <Del>
"   imap    <C-Space>               <BS>
    imap    <S-BS>                  <Del>
    imap    <C-BS>                  <Esc>wbcw


"==============================================================================
"
"   関数定義
"
"------------------------------------------------------------------------------
"   attention:
"       ・関数名は組み込み関数との区別のため大文字から始める。
"       ・再読み込みによるエラーを回避するために「!」を付ける(重複は再定義される)。
"       ・vimの設定値(set〜で設定できるもの)を参照するときは「&設定名」。
"       ・レジスタの値を操作するときは「@レジスタ」。
"       ・マルチステートメントは「|」で区切る。その際「:」は不要。
"       ・等価比較は「==」だが、文字列の等価比較は以下の通り。
"           ==? : 大文字／小文字区別なし
"           ==# : 大文字／小文字区別あり
"           =~  : 正規表現に一致(notは!~)

"<< トグル : ウィンドウ幅 >>
    :function! Toggle_WindowWidth()
        :if &columns <= 80
            :set columns=120
        :elseif &columns <= 120
            :set columns=160
        :elseif &columns <= 160
            :set columns=200
        :else
            :set columns=80
        :endif
    "   :if &columns <= 120 | set columns=200 | else | set columns=120 | endif
    :endfunction

"<< トグル : 行間 >>
    :function! Toggle_RowHight()
        :if &linespace <= 0
            :set linespace=1
        :elseif &linespace == 1
            :set linespace=2
        :else
            :set linespace=0
        :endif
    :endfunction

"<< トグル : 制御コード表示／非表示 >>
    :function! Toggle_ListMode()
    "   :if &list | set nolist | else | set list | endif
        :execute &list ? "set nolist" : "set list"
    "   :execute "set " . &list ? "nolist" : "list"     " この書き方はエラーになる(３項演算子の後ろにコメントを書いてもエラーになってしまう)
    :endfunction

"<< トグル : ワードラップ >>
    :function! Toggle_WrapMode()
    "   :if &wrap | set nowrap | else | set wrap | endif
        :execute &wrap ? "set nowrap" : "set wrap"
    :endfunction

"<< >>
    :function! Open_ThisFile()
        :execute "!open " . @%
    :endfunction

"<< >>
    :function! Toggle_FontSize()
        :if &guifont ==? "Courier:h12"      " ==? は大文字小文字を無視した等価比較
            :set guifont=Courier:h13
            :set lines=47
        :elseif &guifont ==? "Courier:h13"
            :set guifont=Courier:h14
            :set lines=42
        :else
            :set guifont=Courier:h12
            :set lines=52
        :endif
    :endfunction

"<< コメントアウト >>
    :function! ComentOut()
        " ファイルタイプの判定
        :if &filetype ==? "vim"
            :let coment = "\"\t"
        :elseif &filetype ==? "sh"
            :let coment = "#\t"
        :elseif &filetype ==? "prolog"
            :let coment = "%\t"
        :elseif &filetype ==? "perl"
            :let coment = "#\t"
        :elseif &filetype ==? "python"
            :let coment = "#\t"
        :elseif &filetype ==? "ruby"
            :let coment = "#\t"
        :elseif &filetype ==? "c"
            :let coment = "/* */"
        :elseif &filetype ==? "haskell"
            :let coment = "--\t"
        :elseif &filetype ==? "html"
            :let coment = "<!-- -->"
        :elseif &filetype ==? "lisp"
            :let coment = ";\t"
        :elseif &filetype ==? "st"  " Smalltalk
            :let coment = "\" \""
        :elseif &filetype ==? "vb"
            :let coment = "'\t"
        :else
            :let coment = "//\t"
        :endif
        " カーソル位置にコメントを挿入
        :let pos = getpos(".")
        :execute ":normal i" . coment
        :call setpos('.', pos)
    :endfunction

"-- End of .vimrc
