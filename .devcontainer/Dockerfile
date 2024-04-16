FROM node:latest

# git completionスクリプトをダウンロード
RUN cd && \
  curl -o .git-completion.sh \
    https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash && \
  curl -o .git-prompt.sh \
    https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh

# .bashrcにgit completionを読み込む設定を追加
RUN echo "if [ -f ~/.git-completion.sh ]; then\n\
  source ~/.git-completion.sh\n\
fi\n\
if [ -f ~/.git-prompt.sh ]; then\n\
    source ~/.git-prompt.sh\n\
fi\n\
GIT_PS1_SHOWDIRTYSTATE=true\n\
GIT_PS1_SHOWUNTRACKEDFILES=true\n\
GIT_PS1_SHOWSTASHSTATE=true\n\
GIT_PS1_SHOWUPSTREAM=auto\n\
\n\
PS1='[\[\033[32m\]\u@\h\[\033[00m\] \[\033[33m\]\w\[\033[1;36m\]$(__git_ps1 " (%s)")\[\033[00m\]]\n\$ '" >> ~/.bashrc
