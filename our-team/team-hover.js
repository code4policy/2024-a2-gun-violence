// team-hover.js

document.querySelectorAll('.team-member').forEach(function (member) {
    member.addEventListener('mouseover', function () {
        this.querySelector('.member-info').style.display = 'block';
    });

    member.addEventListener('mouseout', function () {
        this.querySelector('.member-info').style.display = 'none';
    });
});
